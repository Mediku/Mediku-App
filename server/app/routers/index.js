const router = require("express").Router();
const routerUser = require("./routerUser");
const routerClinic = require("./routerClinic");
const routerRegistrationUser = require("./routerRegistrationUser");
const routerRegistrationClinic = require("./routerRegistrationClinic");
const routerDomicile = require("./routerDomicile");
const routerPayment = require("./routerPayment");
const ErrorHandler = require("../middlewares/ErrorHandler.js");

router.use("/clinic", routerClinic);
router.use("/users", routerUser);
// registrations/user/id
router.use("/registrations/user", routerRegistrationUser);

// yang client
router.use("/registrations/clinic", routerRegistrationClinic);
router.use("/xendits", routerPayment);
router.use("/", routerDomicile);

router.use(ErrorHandler);

module.exports = router;
