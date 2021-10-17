const router = require('express').Router()
const ControllerRegistration = require('../Controllers/ControllerRegistration')
const authentication = require('../middlewares/authentication')

router.use(authentication)
router.get('/', ControllerRegistration.findAll)
router.get('/:id', ControllerRegistration.findOneRegistration)
router.post('/', ControllerRegistration.createRegistration)
router.put('/:id', ControllerRegistration.editRegistration)
router.delete('/:id', ControllerRegistration.deleteRegistration)

module.exports = router