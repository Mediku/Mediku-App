const router = require("express").Router();
const ControllerService = require("../Controllers/ControllerService");

router.get("/", ControllerService.findAll);
router.get("/:id", ControllerService.findOneService);
router.post("/", ControllerService.createService);
router.put("/:id", ControllerService.editService);
router.delete("/:id", ControllerService.deleteService);

module.exports = router;
