const { verifyToken } = require('./jwtHelper')

module.exports = (req, res, next) => {
  let token = req.headers.authorization

  if (token) {
    token = token.replace(/bearer(\s+)/i, '')

    verifyToken(token, async (error, decoded) => {
      if (error) {
        return res.status(401).json({
          success: false,
          error: error.message,
        })
      }

      if (decoded.onboarding_password_changed === false) {
        return res.status(401).json({
          success: false,
          error: 'Default password not allowed',
        })
      }

    

      res.decoded = decoded
      return next()
    })
  } else {
    return res.status(401).json({
      success: false,
      error: 'Missing credentials',
    })
  }
}