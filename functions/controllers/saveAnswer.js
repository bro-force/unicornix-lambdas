const cors = require('../helpers/cors')

const db = require('../database')
const encryptAnswer = require('../helpers/encryptAnswer')

const saveAnswer = (request, response) => {
  const data = request.body
  const hasQuizId = typeof data.quizId === 'string'
  const hasQuestionIndex = typeof data.questionIndex === 'number'
  const hasSelectedAnswer = typeof data.selectedAnswer === 'string'

  if (request.method === 'OPTIONS') {
    return cors(request, response, () => response.status(200).send())
  } else if (request.method !== 'POST') {
    return cors(request, response, () => response.status(405).send('Method not allowed'))
  } else if (!hasQuizId || !hasQuestionIndex || !hasSelectedAnswer) {
    return cors(request, response, () => response.status(500).send('Quiz ID and question id is missing'))
  } else {
    const questionRef = db.ref(`userQuizzes/${data.quizId}/questions/${data.questionIndex}`)

    return questionRef.once('value')
      .then(snapshot => snapshot.val())
      .then(question => {
        const selected = data.selectedAnswer
        const correct = encryptAnswer(data.selectedAnswer) === question.answer

        return { selected, correct }
      })
      .then(question => questionRef.update(question))
      .then(() => {
        return cors(request, response, () => response.status(200).send())
      })
      .catch(error => {
        console.error(error)

        return cors(request, response, () => response.status(500).send(error))
      })
  }
}

module.exports = saveAnswer
