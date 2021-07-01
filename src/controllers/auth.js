const helpers = require('../helpers')
const bcrypt = require('bcrypt')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const { createNewToken } = require('../helpers/createToken')
const authModels = require('../models/auth')
const env = process.env

module.exports = {

  talentRegister: async (req, res) => {
    const setData = req.body
    setData.role = 'talent'
    setData.password = await bcrypt.hash(setData.password, await bcrypt.genSalt())
    const registered = {
      email: setData.Email, full_name: setData.full_name, phone_number: setData.phone_number, role: setData.role
    }
    const errValidate = validationResult(req)
    try {
      if (!errValidate.isEmpty()) return helpers.response(res, false, errValidate.errors[0].msg, 400)
      const result = await await authModels.talentRegister(setData)
      return helpers.response(res, true, { result, registered }, 200)
    } catch (err) {
      console.log(err)
      return helpers.response(res, false, 'failed to create account', 400)
    }
  },

  recruiterRegister: async (req, res) => {
    const setData = req.body
    setData.role = 'recruiter'
    setData.password = await bcrypt.hash(setData.password, await bcrypt.genSalt())
    const errValidate = validationResult(req)
    const registered = {
      email: setData.Email, full_name: setData.full_name, company: setData.company, sector: setData.sector, phone_number: setData.phone_number, role: setData.role
    }
    try {
      if (!errValidate.isEmpty()) return helpers.response(res, false, errValidate.errors[0].msg, 400)
      authModels.recruiterRegister(setData, (_, resId) => {
        const result = authModels.postToUserRecruiter(resId.insertId)
        console.log(resId)
        return helpers.response(res, true, { result, registered }, 200)
      })
    } catch (err) {
      console.log(err)
      return helpers.response(res, false, 'failed to create account', 400)
    }
  },

  userLogin: async (req, res) => {
    const { Email, password } = req.body
    try {
      const result = await authModels.userLogin(Email)
      const user = result[0]
      if (result.length < 1) return helpers.response(res, false, 'Email or password did not match to the record', 400)
      const compare = await bcrypt.compare(password, user.password)
      if (compare) {
        const userData = jwt.sign({ id: user.id, role: user.role, fullName: user.full_name, company: user.company, sector: user.sector }, env.APP_KEY)
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
          return helpers.response(res, true, data, 200)
        }
      } else {
        return helpers.response(res, false, 'Email or password did not match to the record', 400)
      }
    } catch (err) {
      console.log(err)
      return helpers.response(res, false, 'Internal Server Error', 500)
    }
  }

}
