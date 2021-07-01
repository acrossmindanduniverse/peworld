const express = require('express')
const router = express.Router()
const { verifyJwt } = require('../middlewares/auth')
const upload = require('../helpers/upload')
const userController = require('../controllers/user')
const userExperienceController = require('../controllers/user_experience')
const userPortofolioController = require('../controllers/user_portofolio')

router.get('/talent/', userController.getTalentList)
router.put('/talent/', verifyJwt, userController.updateProfile)
router.get('/talent/portofolio', verifyJwt, userPortofolioController.getPortofoliosByIdUser)
router.get('/talent/experience', verifyJwt, userExperienceController.getExperiencesByIdUser)
router.delete('/talent/portofolio/:idPort', verifyJwt, userPortofolioController.deletePortofoliosUser)
router.get('/talent/:id', userController.getDetailTalent)
router.get('/talent/skill/:id', userController.getTalentSkill)
router.post('/talent/experience', verifyJwt, userExperienceController.createExperienceUser)
router.post('/talent/portofolio', verifyJwt, upload.single('picture'), userPortofolioController.createPortofolioUser)

module.exports = router
