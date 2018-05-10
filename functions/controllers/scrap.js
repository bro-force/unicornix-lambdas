const functions = require('firebase-functions')
const fetchAndStoreReviews = require('../database-controllers/fetchAndStoreReviews')

const scrap = (request, response) => {
  return fetchAndStoreReviews()
    .then(() => response.send('Ok'))
    .catch(error => {
      console.error(error)

      return new Error(error)
    })
}

module.exports = scrap
