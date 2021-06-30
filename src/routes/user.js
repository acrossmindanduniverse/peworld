const express = require('express')
const router = express.Router()
const userController = require('../controllers/user')

router.get('/talent/', userController.getTalentList)
router.get('/talent/:id', userController.getDetailTalent)
router.get('/talent/skill/:id', userController.getTalentSkill)
module.exports = router
