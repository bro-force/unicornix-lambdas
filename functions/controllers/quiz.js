require('dotenv').load();
const functions = require('firebase-functions')
const cors = require('../helpers/cors')

const db = require('../database')

const generateQuiz = require('../database-controllers/generateQuiz')

const quiz = (request, response) => {
  return generateQuiz(request.query.amount)
    .then(quiz => {
      const quizId = db.ref('userQuizzes').push().key

      const quizData = {
        id: quizId,
        questions: quiz,
        nickname: request.query.nickname,
        createdAt: Date.now()
      }

      db.ref(`userQuizzes/${quizId}`).set(quizData)

      return quizData
    })
    .then(quiz => cors(request, response, () => response.send(quiz)))
}

module.exports = quiz
