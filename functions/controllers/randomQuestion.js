require('dotenv').load();
const functions = require('firebase-functions')
const getLastReviewId = require('../database-controllers/lastReview')
const getReviewById = require('../database-controllers/getReviewById')
const shuffle = require('shuffle-array');


const CryptoJS = require("crypto-js");
const Base64 = require('crypto-js/enc-base64')

const quiz = (request, response) => {

  return generateQuiz(request.query.amount).then(quiz => {
    return response.send(quiz)
  })
}

const generateQuiz = (amount = 10) => {

  const arrPromises = Array.from({
    length: amount
  }).map(() => {
    return generateRandomQuestion();
  })

  return Promise.all(arrPromises).then(quiz => quiz);

}

const generateRandomQuestion = () => {

  let answer;
  return randomReview()
    .then((result) => {
      answer = result
      return generateAlternatives(answer)
    }).then((alternatives) => {
      alternatives.push(answer.company.toUpperCase())
      shuffle(alternatives)
      return new Promise((resolve, reject) => {       
        resolve({
          comment:  answer.comment,
          answer: encryptAnswer(answer.company.toUpperCase()),
          alternatives
        })
      })
    }).catch(err => console.log(err))
} 
const encryptAnswer = (answer) => {
  const encryptKey = process.env.ENCRYPTION_KEY || functions.config().encryption.key
  return Base64.stringify(CryptoJS.HmacSHA1(answer, encryptKey))
}

const randomReview = () => {
  return getLastReviewId()
    .then(lastId => {
      const randomId = Math.floor(Math.random() * lastId) + 1

      return getReviewById(randomId)
    }).catch(err => console.log(err))
}

const generateAlternatives = (answer, result = []) => {

  return randomReview()
    .then((reviewAlternative) => {

      const reviewAltCompany = reviewAlternative.company.toUpperCase()

      let newResult = result.filter((alternative) => {
        const isDifferentFromReview = alternative !== reviewAltCompany
        const isDifferentFromAnswer = alternative !== answer.company.toUpperCase()

        return isDifferentFromReview && isDifferentFromAnswer
      });


      if (newResult.length === 3) return newResult

      newResult.push(reviewAltCompany);

      return generateAlternatives(answer, newResult)

    }).catch(err => console.log(err))
}


module.exports = quiz