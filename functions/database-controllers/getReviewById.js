const db = require('../database')

const reviewById = (id) => {
  return db.ref(`reviews/${id}`).once('value')
    .then(snapshot => snapshot.val())
}

module.exports = reviewById
