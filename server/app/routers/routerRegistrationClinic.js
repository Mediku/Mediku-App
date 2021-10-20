const router = require('express').Router()
const ControllerRegistrationClinic = require('../Controllers/ControllerRegistrationClinic')
const { authenticationClinic } = require('../middlewares/authentication')
const { authorizationClinic } = require('../middlewares/authorization')

router.use(authenticationClinic)
router.get('/', ControllerRegistrationClinic.findAll)
router.get('/today', ControllerRegistrationClinic.findAllTodayRegistration)
router.get('/:id', authorizationClinic, ControllerRegistrationClinic.findOneRegistration)
router.put('/edit/:id', authorizationClinic, ControllerRegistrationClinic.editRegistration)
router.delete('/:id', authorizationClinic, ControllerRegistrationClinic.deleteRegistration)
router.patch('/test/result/:id', authorizationClinic, ControllerRegistrationClinic.editTestResult)
router.patch('/istested/:id', authorizationClinic, ControllerRegistrationClinic.editIsTestedRegistration)

module.exports = router;