const router = require('express').Router()
const routerUser = require('./routerUser')
const routerRegistration = require('./routerRegistration')
const routerDomicile = require('./routerDomicile')
const ErrorHandler = require('../middlewares/ErrorHandler.js')

router.use('/', routerUser)
router.use('/registrations', routerRegistration)
router.use('/', routerDomicile)

router.use(ErrorHandler)

module.exports = router