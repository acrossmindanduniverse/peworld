const { response } = require('../helpers')
const env = process.env
const { getPortofoliosByIdUser, addPortofoliosUser, getPortofolioById, updateUserPortofolio, deletePortofoliosUser } = require('../models/user_portofolio')

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

  createPortofolioUser: async function (req, res) {
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
  },

  updateUserPortofolio: async (req, res) => {
    const setData = req.body
    const userId = req.authUser.result.id
    setData.picture = `${env.APP_UPLOAD_ROUTE}/${req.file.filename}`
    const { id } = req.params
    try {
      await getPortofolioById(id, (_, resId) => {
        console.log(resId[0].id_user)
        if (userId !== resId[0].id_user) return response(res, false, 'you have no access about all of these', 400)
        const result = updateUserPortofolio(setData, resId[0].id)
        console.log(setData.picture)
        return response(res, true, { result, updated: setData }, 200)
      })
    } catch (err) {
      console.log(err)
      return response(res, false, 'An error occured', 500)
    }
  }

}
