const { response } = require('../helpers')
const { getExperiencesByIdUser, addExperiencesUser } = require('../models/user_experience')

module.exports = {

  getExperiencesByIdUser: async (req, res) => {
    const idUser = req.authUser.result.id
    try {
      const result = await getExperiencesByIdUser(idUser)
      return response(res, true, result, 200)
    } catch (err) {
      return response(res, false, 'An error occured', 500)
    }
  },

  createExperienceUser: async (req, res) => {
    console.log(req.authUser)
    const data = req.body
    const setData = {
      id_user: req.authUser.result.id,
      ...data
    }
    console.log(setData)
    try {
      const result = await addExperiencesUser(setData)
      return response(res, true, result, 200)
    } catch (err) {
      return response(res, false, 'An error occured', 500)
    }
  }
}
