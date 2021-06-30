const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const userExperienceController = require('../controllers/user_experience')
const userPortofolioController = require('../controllers/user_portofolio')

router.get('/talent/', userController.getTalentList)
router.get('/talent/:id', userController.getDetailTalent)
router.get('/talent/skill/:id', userController.getTalentSkill)
router.get('/talent/experience/:idUser', userExperienceController.getExperiencesByIdUser)
router.get('/talent/portofolio/:idUser', userPortofolioController.getPortofoliosByIdUser)

module.exports = router
