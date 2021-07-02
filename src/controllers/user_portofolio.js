const { response } = require('../helpers')
const { getPortofoliosByIdUser, addPortofoliosUser, getPortofolioById, updateUserPortofolio, deletePortofoliosUser } = require('../models/user_portofolio')
const fs = require('fs')
const path = './assets/pictures'
module.exports = {

  getPortofoliosByIdUser: async (req, res) => {
    // const idUser = req.authUser.result.id
    const { idUser } = req.params
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
    const { idPort } = req.params
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
    setData.picture = req.file.filename
    const { id } = req.params
    try {
      await getPortofolioById(id, (_, resId) => {
        console.log(resId[0].id_user)
        if (userId !== resId[0].id_user) return response(res, false, 'you have no access about all of these', 400)
        fs.unlinkSync(path + '/' + resId[0].picture, (err, imgRes) => {
          if (!err) console.log(imgRes)
        })
        const result = updateUserPortofolio(setData, resId[0].id)
        return response(res, true, { result, updated: setData }, 200)
      })
    } catch (err) {
      console.log(err)
      return response(res, false, 'An error occured', 500)
    }
  }

}
