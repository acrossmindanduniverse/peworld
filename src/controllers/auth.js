const helper = require('../helpers')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { createNewToken } = require('../helpers/createToken')
const authModels = require('../models/auth')
const env = process.env

module.exports = {

  talentRegister: async (req, res) => {
    const setData = req.body
    setData.role = setData.role ? 'admin' : 'talent'
    try {
      const result = await await authModels.talentRegister(setData)
      return helper.response(res, true, result, 200)
    } catch (err) {
      console.log(err)
      return helper.response(res, false, 'failed to create account', 400)
    }
  },

  recruiterRegister: async (req, res) => {
    const setData = req.body
    setData.role = 'recruiter'
    setData.password = await bcrypt.hash(setData.password, await bcrypt.genSalt())
    try {
      const result = await authModels.recruiterRegister(setData)
      return helper.response(res, true, result, 200)
    } catch (err) {
      console.log(err)
      return helper.response(res, false, 'failed to create account', 400)
    }
  },

  userLogin: async (req, res) => {
    const { Email, password } = req.body
    try {
      const result = await authModels.userLogin(Email)
      const user = result[0]
      if (result.length < 1) return helper.response(res, false, 'Email or password did not match to the record', 400)
      const compare = await bcrypt.compare(password, user.password)
      if (compare) {
        const userData = jwt.sign({ id: user.id, role: user.role, fullName: user.full_name }, env.APP_KEY)
        if (userData) {
          const payload = jwt.verify(userData, env.APP_KEY)
          const token = createNewToken(
            { ...payload },
            env.APP_KEY,
            '10h'
          )
          const data = {
            token,
            userData: payload
          }
          return helper.response(res, true, data, 200)
        }
      }
    } catch (err) {
      console.log(err)
      return helper.response(res, false, 'Email or password did not match to the record', 400)
    }
  }

}
