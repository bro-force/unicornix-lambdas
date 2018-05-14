const functions = require('firebase-functions')

const randomReview = require('./controllers/randomReview')
const quiz = require('./controllers/quiz')
const saveAnswer = require('./controllers/saveAnswer')

exports.randomReview = functions.https.onRequest(randomReview)
exports.quiz = functions.https.onRequest(quiz)
exports.saveAnswer = functions.https.onRequest(saveAnswer)
