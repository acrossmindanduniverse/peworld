const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')
const userExperienceController = require('../controllers/user_experience')
const userPortofolioController = require('../controllers/user_portofolio')
const upload = require('../helpers/upload')
const authMiddleware = require('../middlewares/auth')

router.get('/talent/', userController.getTalentList)
router.delete('/delete-experience/:id', authMiddleware.verifyJwt, userExperienceController.deleteUserExperience)
router.put('/edit-experience/:id', authMiddleware.verifyJwt, userExperienceController.updateUserExperience)
router.put('/edit-portofolio/:id', authMiddleware.verifyJwt, upload.single('picture'), userPortofolioController.updateUserPortofolio)
router.get('/talent/:id', userController.getDetailTalent)
router.get('/talent/skill/:id', userController.getTalentSkill)
router.get('/talent/experience/:idUser', userExperienceController.getExperiencesByIdUser)
router.post('/talent/experience/:idUser', userExperienceController.createExperienceUser)
router.get('/talent/portofolio/:idUser', userPortofolioController.getPortofoliosByIdUser)

module.exports = router
