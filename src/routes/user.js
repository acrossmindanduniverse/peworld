const express = require('express')
const router = express.Router()
const { verifyJwt } = require('../middlewares/auth')
const upload = require('../helpers/upload')
const userController = require('../controllers/user')
const userExperienceController = require('../controllers/user_experience')
const userPortofolioController = require('../controllers/user_portofolio')

router.get('/talent/', userController.getTalentList)
router.get('/talent/:id', userController.getDetailTalent)
router.get('/talent/skill/:id', userController.getTalentSkill)
router.get('/talent/experience/:idUser', verifyJwt, userExperienceController.getExperiencesByIdUser)
router.post('/talent/experience/:idUser', userExperienceController.createExperienceUser)
router.get('/talent/portofolio/:idUser', userPortofolioController.getPortofoliosByIdUser)
router.post('/talent/portofolio', verifyJwt, upload.single('picture'), userPortofolioController.createExperienceUser)

module.exports = router
