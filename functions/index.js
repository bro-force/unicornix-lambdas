const functions = require('firebase-functions')

const randomReview = require('./controllers/randomReview')
const quiz = require('./controllers/quiz')

exports.randomReview = functions.https.onRequest(randomReview)
exports.quiz = functions.https.onRequest(quiz)
