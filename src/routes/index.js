const express = require('express')
const router = express.Router()
const userRoute = require('./user')
const authRoute = require('./auth')
const hireRoute = require('./hire')
// prefix('/')

router.use('/auth', authRoute)
router.use('/user', userRoute)
router.use('/hire', hireRoute)

module.exports = router
