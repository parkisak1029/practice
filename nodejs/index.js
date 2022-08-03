const express = require('express');
const nunjucks = require('nunjucks');
const app = express();
const router = require('./routes')
const cors = require('cors')
const session = require('express-session')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

app.set("view engine", "html")
nunjucks.configure('views', {
    express:app,
})

app.use(bodyParser.json());
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
app.use(cookieParser());
app.use(session({
    key: 'sid',
    secret:'secret Key',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        Secure: true
    }
}))

app.use(router)

const server = app.listen(3000, () => {
    console.log('3000port start')
});


//--------------socket.io----------//
const io = require('socket.io')(server, {
  cookie : 'id'
});

io.on("connection", async(socket) => {
  console.log(socket.session)
  console.log("User connected", socket.id);
  socket.on("new_message", (data) => {
      console.log("Client says", data);

      io.emit('new_message', data)
    }
  ) 
});

io.sockets.on('connection', function(socket) {
  console.log(socket.request.session)

  socket.on('newUser', function(name) {
    console.log(name + ' 님이 접속하였습니다.')

    socket.name = name

    io.sockets.emit('update', {type: 'connect', name: 'SERVER', message: name + '님이 접속하였습니다.'})
  })

  socket.on('message', function(data) {
    data.name = socket.name
    
    console.log(data)

    socket.broadcast.emit('update', data);
  })

  socket.on('disconnect', function() {
    console.log(socket.name + '님이 나가셨습니다.')

    socket.broadcast.emit('update', {type: 'disconnect', name: 'SERVER', message: socket.name + '님이 나가셨습니다.'});
  })
})