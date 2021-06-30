const express = require('express')
const router = express.Router()
const userExperienceController = require('../controllers/user_experience')
const userPortofolioController = require('../controllers/user_portofolio')

router.get('/:idUser/experience', userExperienceController.getExperiencesByIdUser)
router.get('/:idUser/portofolio', userPortofolioController.getPortofoliosByIdUser)

module.exports = router
