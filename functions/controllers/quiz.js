require('dotenv').load();
const functions = require('firebase-functions')
const cors = require('cors')({ origin: true })

const generateQuiz = require('../database-controllers/generateQuiz')

const quiz = (request, response) => {
  return generateQuiz(request.query.amount)
    .then(quiz => cors(request, response, () => response.send(quiz)))
}

module.exports = quiz
