const randomReview = require('./randomReview')

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

      newResult.push(reviewAltCompany)

      return generateAlternatives(answer, newResult)

    })
    .catch(err => console.log(err))
}

module.exports = generateAlternatives
