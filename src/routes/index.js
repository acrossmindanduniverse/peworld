const express = require('express')
const router = express.Router()
const authRoute = require('./auth')

// prefix('/')

router.use('/auth', authRoute)

module.exports = router
