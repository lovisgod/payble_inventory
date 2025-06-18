const jwt = require('jsonwebtoken')
require('dotenv').config()


function verifyToken(token, callback) {
 jwt.verify(token, process.env.SECRET, callback)
}


module.exports = {
  verifyToken
}