const router = require("express").Router();
const routerClinic = require("./routerClinic");
const ErrorHandler = require("../middlewares/ErrorHandler.js");

router.use("/", routerClinic);
router.use(ErrorHandler);

module.exports = router;
