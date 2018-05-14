const generateRandomQuestion = require('./generateRandomQuestion')

const generateQuiz = (amount = 10) => {
  const arrPromises =
    Array.from({ length: amount })
      .map(() => generateRandomQuestion())

  return Promise.all(arrPromises)
}

module.exports = generateQuiz
