const shuffle = require('shuffle-array')

const randomReview = require('./randomReview')
const generateAlternatives = require('./generateAlternatives')
const encryptAnswer = require('../helpers/encryptAnswer')

const generateRandomQuestion = () => {
  return randomReview()
    .then((answer) => {
      return generateAlternatives(answer)
        .then(alternatives => ({ answer, alternatives }))
    })
    .then(({
      answer,
      alternatives
    }) => {
      alternatives.push(answer.company.toUpperCase())
      shuffle(alternatives)

      return {
        comment: answer.comment,
        answer: encryptAnswer(answer.company.toUpperCase()),
        alternatives
      }
    })
    .catch(err => console.log(err))
}

module.exports = generateRandomQuestion
