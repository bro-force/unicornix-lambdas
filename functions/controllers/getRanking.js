const cors = require('../helpers/cors')
const db = require('../database')

const snapshotToList = snapshot => {
  const data = snapshot.val() || {}

  return Object.keys(data).map(key => ({
    points: data[key].points,
    nickname: data[key].nickname,
    createdAt: data[key].createdAt
  }))
}

const sortRanking = ranking => {
  return ranking.sort((a, b) => {
    return b.points - a.points
  })
}

const getRanking = (request, response) => {
  return db.ref('userQuizzes').orderByChild('points').limitToLast(10).once('value')
    .then(snapshotToList)
    .then(sortRanking)
    .then(ranking => {
      return cors(request, response, () => response.status(200).send(ranking))
    })
}

module.exports = getRanking
