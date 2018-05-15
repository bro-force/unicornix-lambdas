const functions = require('firebase-functions')

const quiz = require('./controllers/quiz')
const saveAnswer = require('./controllers/saveAnswer')
const saveResult = require('./controllers/saveResult')
const getRanking = require('./controllers/getRanking')

exports.quiz = functions.https.onRequest(quiz)
exports.saveAnswer = functions.https.onRequest(saveAnswer)
exports.saveResult = functions.https.onRequest(saveResult)
exports.ranking = functions.https.onRequest(getRanking)
