const { response } = require('../helpers')
const { getPortofoliosByIdUser, addPortofoliosUser, deletePortofoliosUser } = require('../models/user_portofolio')

module.exports = {

  getPortofoliosByIdUser: async (req, res) => {
    const idUser = req.authUser.result.id
    try {
      const result = await getPortofoliosByIdUser(idUser)
      return response(res, true, result, 200)
    } catch (err) {
      return response(res, false, 'An error occured', 500)
    }
  },

  createExperienceUser: async function (req, res) {
    console.log(req.authUser)
    const data = req.body
    data.picture = req.file.filename
    const setData = {
      id_user: req.authUser.result.id,
      ...data
    }
    console.log(setData)
    try {
      const result = await addPortofoliosUser(setData)
      return response(res, true, result, 200)
    } catch (error) {
      console.log(error)
    }
  },
  deletePortofoliosUser: async (req, res) => {
    const idUser = req.authUser.result.id
    const idPort = req.query.param
    try {
      const result = await deletePortofoliosUser(idPort, idUser)
      return response(res, true, result, 200)
    } catch (err) {
      return response(res, false, 'An error occured', 500)
    }
  }

}
