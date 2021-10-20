const router = require("express").Router();
const ControllerUser = require("../Controllers/ControllerUser");
const authentication = require("../middlewares/authentication");
const { authorizationUser } = require('../middlewares/authorization')

router.post("/login", ControllerUser.login);
router.post("/register", ControllerUser.register);
router.post("/auth/google", ControllerUser.googleAuthLogin);
router.use(authentication);
router.get("/logined", ControllerUser.findUserLogin);
router.delete("/:id", authorizationUser, ControllerUser.deleteUser);
router.put("/edit/profile", ControllerUser.editUserProfile);

module.exports = router;
