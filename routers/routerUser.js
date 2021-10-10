const router = require('express').Router()
const ControllerUser = require('../Controllers/ControllerUser')
const authentication = require('../middlewares/authentication')

router.post('/login', ControllerUser.login)
router.post('/register', ControllerUser.register)
router.post('/auth/google', ControllerUser.googleAuthLogin)
router.use(authentication)
router.get('/user', ControllerUser.findUserLogin)

module.exports = router