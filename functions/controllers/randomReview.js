const functions = require('firebase-functions')
const getLastReviewId = require('../database-controllers/lastReview')
const getReviewById = require('../database-controllers/getReviewById')

const randomReview = (request, response) => {
  return getLastReviewId()
    .then(lastId => {
      const randomId = Math.floor(Math.random() * lastId) + 1

      return getReviewById(randomId)
    })
    .then(review => {
      return response.send(review)
    })
}

module.exports = randomReview
