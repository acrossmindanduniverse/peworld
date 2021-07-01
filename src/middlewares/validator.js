const { check, checkSchema } = require('express-validator')
const errors = require('../helpers/errors')

const validator = [
  checkSchema({
    Email: {
      isLength: {
        errorMessage: errors.Email,
        options: {
          min: 5
        }
      }
    },
    password: {
      isLength: {
        errorMessage: errors.password,
        options: {
          min: 6
        }
      }
    }
  }),
  check('confirm_password')
    .exists()
    .custom(async (matchPassword, { req }) => {
      if (req.body.password !== matchPassword) {
        throw new Error(errors.resendPassword)
      }
    })
]

module.exports = validator
