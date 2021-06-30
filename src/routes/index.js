const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const authRoute = require('./auth')
// prefix('/')

router.use('/auth', authRoute)
router.use('/user', userRoute)

module.exports = router
