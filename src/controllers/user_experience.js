const { response } = require('../helpers')
const { getExperiencesByIdUser } = require('../models/user_experience')

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
  }

}