const router = require("express").Router();
const ControllerRegistration = require("../Controllers/ControllerRegistration");
const {authentication, authClinic} = require("../middlewares/authentication");
const { authorizationRegistration } = require("../middlewares/authorization");

router.use(authClinic);
router.get("/", ControllerRegistration.findAll);
router.get("/:id", authorizationRegistration, ControllerRegistration.findOneRegistration);
router.post("/", ControllerRegistration.createRegistration);
router.patch("/testresult/:id", ControllerRegistration.editTestResult);
router.put(
  "/:id",
  authorizationRegistration,
  ControllerRegistration.editRegistration
);
router.delete(
  "/:id",
  authorizationRegistration,
  ControllerRegistration.deleteRegistration
);

module.exports = router;
