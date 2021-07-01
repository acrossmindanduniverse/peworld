const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth')
const validator = require('../middlewares/validator')

router.post('/register', validator, authController.talentRegister)
router.post('/register/recruiter', validator, authController.recruiterRegister)
router.post('/login', authController.userLogin)

module.exports = router
