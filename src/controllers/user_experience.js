const { response } = require('../helpers')
const { getExperiencesByIdUser, addExperiencesUser, updateUserExperience, getUserExperienceId, getUserExperienceIdForDelete, deleteUserExperience } = require('../models/user_experience')

module.exports = {

  getExperiencesByIdUser: async (req, res) => {
    const id_user = req.authUser.result.id
    try {
      const result = await getExperiencesByIdUser(id_user)
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
  },

  updateUserExperience: async (req, res) => {
    const setData = req.body
    const { id } = req.params
    try {
      await getUserExperienceId(id, (_, resId) => {
        if (req.authUser.result.id !== resId[0].id_user) {
          return response(res, false, 'you have no access about all of these', 400)
        }
        const result = updateUserExperience(setData, resId[0].id)
        return response(res, true, { result, updated: setData }, 200)
      })
    } catch (err) {
      console.log(err)
      return response(res, false, 'An error occured')
    }
  },

  deleteUserExperience: async (req, res) => {
    const { id } = req.params
    try {
      await getUserExperienceIdForDelete(id, (err, resId) => {
        console.log(err)
        if (req.authUser.result.id !== resId[0].id_user) return response(res, false, 'you have no access about all of these!', 400)
        const result = deleteUserExperience(resId[0].id)
        return response(res, true, { result, deleted: resId }, 200)
      })
    } catch (err) {
      console.log(err)
      return response(res, false, 'An error occured', 500)
    }
  }
}
