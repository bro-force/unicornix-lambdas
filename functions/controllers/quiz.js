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
      db.ref(`userQuizzes/${quizId}/nickname`).set(request.query.nickname)

      return {
        id: quizId,
        questions: quiz,
        nickname: request.query.nickname,
        createdAt: Date.now()
      }
    })
    .then(quiz => cors(request, response, () => response.send(quiz)))
}

module.exports = quiz
