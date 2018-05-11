const functions = require('firebase-functions')
const getLastReviewId = require('../database-controllers/lastReview')
const getReviewById = require('../database-controllers/getReviewById')

const randomQuestion = (request, response) => {

  let answer;

  return randomReview()
    .then((result) => {
      answer = result;
      return generateAlternatives(answer)
    }).then((alternatives) => {
      alternatives.push(answer.company.toUpperCase())
      return response.send({
        answer,
        alternatives
      })
    })
}

//TODO
const encryptAnswer= () => {}

const randomReview = () => {
  return getLastReviewId()
    .then(lastId => {
      const randomId = Math.floor(Math.random() * lastId) + 1

      return getReviewById(randomId)
    }).catch(err => console.log(err))
}

const generateAlternatives = (answer, amount = 3, result = []) => {

  return randomReview()
    .then((reviewAlternative) => {

      const reviewAltCompany = reviewAlternative.company.toUpperCase()

      const newResult = result.filter((alternative) => {
        const condOne = alternative !== reviewAltCompany
        const condTwo = alternative !== answer.company.toUpperCase()

        return condOne && condTwo
      });
      
      
      const newAmount = -1

      if (newResult.length === 3) return newResult

      newResult.push(reviewAltCompany);

      return generateAlternatives(answer, newAmount, newResult)

    }).catch(err => console.log(err))
}


module.exports = randomQuestion