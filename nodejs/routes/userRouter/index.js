const express = require('express')
const router = express.Router()
const userController = require('./user.control')

router.get('/User', userController.users)
// router.get('/RoomsChat', userController.roomChat)

module.exports = router