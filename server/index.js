const express = require('express')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const port = process.env.PORT || 3000

server.listen(port, () => console.log(`App listining on port ${ port }`))

app.use(express.static('public'))

const _path = path.join(__dirname, '../public')

// app.get('/', (req, res) => {
//     //res.send('Hello world !!')
//     res.render('index')
// })

// app.get('/:room', (req, res) => {
//     res.send(req.params)
// })


io.on('connection', socket => {
    socket.on('add user', user => {
        socket.userName = user
        socket.broadcast.emit('user joined', user)
    })
    console.log('connected', socket.id)
    //socket.emit('hello', 'world')
    socket.on('message', msg => {
        console.log(msg, socket.id)
    })
})

