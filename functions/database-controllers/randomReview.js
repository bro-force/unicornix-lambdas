const getLastReviewId = require('./lastReview')
const getReviewById = require('./getReviewById')

const randomReview = () => {
  return getLastReviewId()
    .then(lastId => {
      const randomId = Math.floor(Math.random() * lastId) + 1

      return getReviewById(randomId)
    })
    .catch(err => console.log(err))
}

module.exports = randomReview
