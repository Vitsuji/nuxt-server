const express = require('express')
const router = express.Router()

router.use('/routename', require('./routeNameRoutes'))

module.exports = router
