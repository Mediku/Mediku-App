const router = require("express").Router();
const ControllerClinic = require("../Controllers/ClinicController");

router.post("/add", ControllerClinic.create);
router.get("/list", ControllerClinic.list);
router.get("/list/:id", ControllerClinic.listById);
router.patch("/edit/:id", ControllerClinic.Update);
router.delete("/:id", ControllerClinic.delete);

module.exports = router;
