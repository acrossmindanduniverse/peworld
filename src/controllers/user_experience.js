const { response } = require('../helpers')
const { getExperiencesByIdUser, addExperiencesUser } = require('../models/user_experience')

module.exports = {

  getExperiencesByIdUser: async (req, res) => {
    const { idUser: stringId } = req.params
    const id = parseInt(stringId)
    try {
      const result = await getExperiencesByIdUser(id)
      return response(res, true, result, 200)
    } catch (err) {
      return response(res, false, 'An error occured', 500)
    }
  },

  createExperienceUser: async (req, res) => {
    const { idUser: stringId } = req.params
    const id = parseInt(stringId)
    const data = req.body
    const setData = {
      id_user: id,
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
