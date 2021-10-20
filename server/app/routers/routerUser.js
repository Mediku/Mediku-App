const router = require("express").Router();
const ControllerUser = require("../Controllers/ControllerUser");
const { authenticationUser } = require("../middlewares/authentication");
const { authorizationUserProfile } = require('../middlewares/authorization')

router.post("/login", ControllerUser.login);
router.post("/register", ControllerUser.register);
router.post("/auth/google", ControllerUser.googleAuthLogin);
router.use(authenticationUser);
router.get("/logined", ControllerUser.findUserLogin);
router.delete("/:id", authorizationUserProfile, ControllerUser.deleteUser);
router.put("/edit/profile", ControllerUser.editUserProfile);

module.exports = router;
