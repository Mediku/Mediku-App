const router = require('express').Router()
const routerUser = require('./routerUser')
const routerRegistration = require('./routerRegistration')
const routerService = require('./routerService')
const ErrorHandler = require('../middlewares/ErrorHandler.js')

router.use('/', routerUser)
router.use('/registrations', routerRegistration)
router.use('/services', routerService)

router.use(ErrorHandler)

module.exports = router