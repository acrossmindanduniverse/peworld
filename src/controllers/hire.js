const { response } = require('../helpers')
const { addHire, getHireByIdUserTalent } = require('../models/hire')

module.exports = {

  createHire: async (req, res) => {
    const { id: idUserTalent } = req.params
    console.log(req.authUser)
    const data = req.body
    const setData = {
      id_user_talent: idUserTalent,
      id_user_recruiter: req.authUser.result.id,
      ...data
    }
    console.log(setData)
    try {
      const result = await addHire(setData)
      return response(res, true, result, 200)
    } catch (err) {
      console.log(err)
      return response(res, false, 'An error occured', 500)
    }
  },

  getHireByIdUserTalent: async (req, res) => {
    const id = req.authUser.result.id
    try {
      if (req.authUser.result.role === 'talent') {
        const result = await getHireByIdUserTalent(id)
        return response(res, true, result, 200)
      } else {
        return response(res, false, 'Only talent can access', 403)
      }
    } catch (err) {
      return response(res, false, 'An error occured', 500)
    }
  }

}
