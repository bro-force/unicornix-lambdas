const functions = require('firebase-functions')

const scrap = require('./controllers/scrap')
const randomReview = require('./controllers/randomReview')

exports.scrap = functions.https.onRequest(scrap)
exports.randomReview = functions.https.onRequest(randomReview)
