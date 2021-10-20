const router = require('express').Router()
const ControllerRegistration = require('../Controllers/ControllerRegistration')
const { authenticationClinic, authenticationUser } = require('../middlewares/authentication')
const { authorizationRegistration } = require('../middlewares/authorization')

router.post('/', authenticationUser, ControllerRegistration.createRegistration)
router.use(authenticationClinic)
router.get('/', ControllerRegistration.findAll)
router.get('/:id', ControllerRegistration.findOneRegistration)
router.put('/:id', authorizationRegistration, ControllerRegistration.editRegistration)
router.delete('/:id', authorizationRegistration, ControllerRegistration.deleteRegistration)

module.exports = router