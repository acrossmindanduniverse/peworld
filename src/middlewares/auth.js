const key = process.env
const helper = require('../helpers')
const jwt = require('jsonwebtoken')

module.exports = {

  verifyJwt: (req, res, next) => {
    const headers = req.headers
    if (headers.authorization !== undefined) {
      if (headers.authorization.startsWith('Bearer')) {
        try {
          const token = headers.authorization.slice(7)
          const user = jwt.verify(token, key.APP_KEY)
          req.authUser = user
          next()
        } catch (err) {
          console.log(err)
          return helper.response(res, false, 'Session expired, you have to login first', 400)
        }
      }
    } else {
      return helper.response(res, false, 'Auth token needed', 400)
    }
  },

  verifyAdmin: function (req, res, next) {
    const headers = req.headers
    if (headers?.authorization) {
      if (headers.authorization.startsWith('Bearer')) {
        try {
          const token = headers.authorization.slice(7)
          const decode = jwt.verify(token, key.APP_KEY)
          req.decodedToken = decode
          if (req.decodedToken.result.role !== 'admin') {
            return helper.response(res, false, 'you do not have any permission to access this resource', 400)
          }
          next()
        } catch (err) {
          console.log(err)
          return helper.response(res, false, 'Auth token needed', 400)
        }
      } else {
        console.error()
      }
    } else {
      console.error()
    }
  }

}
