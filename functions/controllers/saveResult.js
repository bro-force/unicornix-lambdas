const cors = require('cors')({ origin: true })
const db = require('../database')

const saveResult = (request, response) => {
  const data = request.body

  if (request.method === 'OPTIONS') {
    return cors(request, response, () => response.status(200).send())
  } else if (request.method !== 'POST') {
    return cors(request, response, () => response.status(405).send('Method not allowed'))
  } else {
    const quizRef = db.ref(`userQuizzes/${data.quizId}`)

    return quizRef.update(data)
      .then(() => {
        return cors(request, response, () => response.status(200).send())
      })
      .catch(() => {
        return cors(request, response, () => response.status(500).send())
      })
  }
}

module.exports = saveResult
