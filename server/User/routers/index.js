const router = require('express').Router()
const routerUser = require('./routerUser')
const ErrorHandler = require('../middlewares/ErrorHandler.js')

router.use('/', routerUser)

router.use(ErrorHandler)

module.exports = router