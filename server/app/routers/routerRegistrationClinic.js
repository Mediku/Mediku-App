const router = require('express').Router()
const ControllerRegistration = require('../Controllers/ControllerRegistrationClinic')
const { authenticationClinic } = require('../middlewares/authentication')

router.use(authenticationClinic)
router.get('/', ControllerRegistration.findAll)
router.get('/:id', ControllerRegistration.findOneRegistration)
router.put('/:id', authenticationClinic, ControllerRegistration.editRegistration)
router.delete('/:id', authenticationClinic, ControllerRegistration.deleteRegistration)

module.exports = router;
