const functions = require("firebase-functions")
const CryptoJS = require("crypto-js")
const Base64 = require('crypto-js/enc-base64')

const encryptAnswer = (answer) => {
  const encryptKey = process.env.ENCRYPTION_KEY || functions.config().encryption.key

  return Base64.stringify(CryptoJS.HmacSHA1(answer, encryptKey))
}

module.exports = encryptAnswer
