require('dotenv').load();
const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })

const db = require('../database')

const generateQuiz = require('../database-controllers/generateQuiz')

const quiz = (request, response) => {
  return generateQuiz(request.query.amount)
    .then(quiz => {
      const quizId = db.ref('userQuizzes').push().key
      db.ref(`userQuizzes/${quizId}/questions`).set(quiz)

      return {
        id: quizId,
        questions: quiz,
        nickname: request.query.nickname
      }
    })
    .then(quiz => cors(request, response, () => response.send(quiz)))
}

module.exports = quiz
