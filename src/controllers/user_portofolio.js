const { response } = require('../helpers')
const { getPortofoliosByIdUser } = require('../models/user_portofolio')

module.exports = {

  getPortofoliosByIdUser: async (req, res) => {
    const { idUser: stringId } = req.params
    const id = parseInt(stringId)
    try {
      const result = await getPortofoliosByIdUser(id)
      return response(res, true, result, 200)
    } catch (err) {
      return response(res, false, 'An error occured', 500)
    }
  }

}
