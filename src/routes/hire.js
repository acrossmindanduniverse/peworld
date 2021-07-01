const express = require('express')
const router = express.Router()
const { verifyJwt } = require('../middlewares/auth')
const hireController = require('../controllers/hire')

router.post('/:id', verifyJwt, hireController.createHire)

module.exports = router
