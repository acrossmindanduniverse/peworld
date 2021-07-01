const express = require('express')
const router = express.Router()
const { verifyJwt } = require('../middlewares/auth')
const upload = require('../helpers/upload')
const userController = require('../controllers/user')
const userExperienceController = require('../controllers/user_experience')
const userPortofolioController = require('../controllers/user_portofolio')
const authMiddleware = require('../middlewares/auth')

router.get('/talent/', userController.getTalentList)
router.delete('/delete-experience/:id', authMiddleware.verifyJwt, userExperienceController.deleteUserExperience)
router.put('/edit-experience/:id', authMiddleware.verifyJwt, userExperienceController.updateUserExperience)
router.put('/edit-portofolio/:id', authMiddleware.verifyJwt, upload.single('picture'), userPortofolioController.updateUserPortofolio)
router.get('/talent/portofolio', verifyJwt, userPortofolioController.getPortofoliosByIdUser)
router.get('/talent/experience', verifyJwt, userExperienceController.getExperiencesByIdUser)
router.get('/talent/:id', userController.getDetailTalent)
router.get('/talent/skill/:id', userController.getTalentSkill)
router.post('/talent/experience', verifyJwt, userExperienceController.createExperienceUser)

router.delete('/talent/portofolio/:idPort', verifyJwt, userPortofolioController.deletePortofoliosUser)

router.post('/talent/portofolio', verifyJwt, upload.single('picture'), userPortofolioController.createPortofolioUser)

module.exports = router
