const router = require("express").Router();
const ControllerPayment = require("../Controllers/ControllerPayment");
const { authenticationUser } = require('../middlewares/authentication')

router.use(authenticationUser)
router.post('/invoice', ControllerPayment.createInvoice)
router.get('/withdrawl', ControllerPayment.createWithdrawal)
router.post('/payment/accepted', ControllerPayment.paymentAccepted)

module.exports = router;