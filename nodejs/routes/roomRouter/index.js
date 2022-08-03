const express = require('express')
const router = express.Router()
const roomController = require('./rooms.control')

router.get('/Rooms', roomController.rooms)
router.get('/RoomsChat', roomController.roomChat)

module.exports = router