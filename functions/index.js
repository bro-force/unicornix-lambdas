const functions = require('firebase-functions')

const randomReview = require('./controllers/randomReview')
const randomQuestion = require('./controllers/randomQuestion')

exports.randomReview = functions.https.onRequest(randomReview)
exports.randomQuestion = functions.https.onRequest(randomQuestion)
