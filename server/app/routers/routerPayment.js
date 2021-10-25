const router = require("express").Router();
const ControllerPayment = require("../Controllers/ControllerPayment");
const { authenticationUser } = require('../middlewares/authentication');
const { authorizationUser } = require("../middlewares/authorization");

router.use(authenticationUser)
router.post('/invoice/:id', authorizationUser, ControllerPayment.createInvoice)
router.patch('/invoice/:id/status', authorizationUser, ControllerPayment.checkStatusInvoice)

module.exports = router;