const router = require("express").Router();
const ControllerRegistrationUser = require("../Controllers/ControllerRegistrationUser");
const { authenticationUser } = require("../middlewares/authentication");
const { authorizationUser } = require("../middlewares/authorization");

router.use(authenticationUser)
router.post('/', ControllerRegistrationUser.createRegistration)
router.get('/:id', authorizationUser, ControllerRegistrationUser.findOneRegistration)
router.put('/:id', authorizationUser, ControllerRegistrationUser.editRegistration)

module.exports = router;
