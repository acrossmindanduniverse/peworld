const jwt = require('jsonwebtoken')

module.exports = {

  createNewToken: (res, key, exp) => {
    const token = jwt.sign(
      { result: res },
      key,
      { expiresIn: exp })
    return token
  }

}
