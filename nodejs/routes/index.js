const express = require('express')
const router = express.Router();
const signRouter = require('./signRouter')
const roomRouter = require('./roomRouter')
const userRouter = require('./userRouter')

router.get('/', (req,res) => {
        res.render("index");
})

router.get('/Home',(req, res) => {
  res.render('room/home')
})

router.use('/sign', signRouter)

router.use('/room', roomRouter)

router.use('/user', userRouter)

module.exports = router