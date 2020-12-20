const express = require('express')
const app = express()
const path = require('path')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const { v4: uuidv4 } = require('uuid')
const port = process.env.PORT || 3000

server.listen(port, () => console.log(`App listining on port ${ port }`))

app.use(express.static('public'))

const _path = path.join(__dirname, '../public')

let users = []

io.on('connection', socket => {
    let id = uuidv4()
    socket.emit('logged users', users) 
    
    socket.on('new user', userName => {    
        socket.user = userName
        socket.broadcast.emit('user joined',{ userName, id })
        socket.broadcast.emit('message',formatMessage('Chat socketIO', `${userName} just joined`))
        users.push({ userName, id })
    })
    
    socket.on('disconnect', () => {
        socket.broadcast.emit('user left', id)
    })

   
    socket.on('message', msg => {
        io.emit('message', formatMessage(socket.user, msg))
    })
})

function formatMessage(userName, message) {
    const _date = new Date()
    const msg = {
        userName,
        msg: message,
        time: `${ _date.getHours()}:${ _date.getMinutes()}`
    }
    return msg
}

