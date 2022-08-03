const express = require('express')
const router = express.Router()
const signController = require('./sign.control')

router.get('/login', signController.login)
router.get('/signUp', signController.signUp)
router.get('/LogOut', signController.logOut)
router.post('/signUp', signController.signUpPost)
router.post('/login', signController.loginPost)

module.exports = router