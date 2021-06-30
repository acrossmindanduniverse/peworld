const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')

router.post('/register', authController.talentRegister)
router.post('/register/recruiter', authController.recruiterRegister)
router.post('/login', authController.userLogin)

module.exports = router
