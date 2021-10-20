const router = require("express").Router();
const routerUser = require("./routerUser");
const routerClinic = require("./routerClinic");
const routerRegistration = require("./routerRegistration");
const routerDomicile = require("./routerDomicile");
const routerPayment = require("./routerPayment");
const ErrorHandler = require("../middlewares/ErrorHandler.js");

router.use("/clinic", routerClinic);
router.use("/users", routerUser);
router.use("/registrations", routerRegistration);
router.use("/xendits", routerPayment);
router.use("/", routerDomicile);

router.use(ErrorHandler);

module.exports = router;
