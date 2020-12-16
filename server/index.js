const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

app.use(express.static('public'))

app.get('/', (req, res) => {
    //res.send('Hello world !!')
    res.render('index')
})

app.get('/:room', (req, res) => {
    res.send(req.params)
})

io.on('connection', socket => {
    console.log('connected', socket.id)
    socket.emit('hello', 'world')
})

const port = process.env.PORT || 3000
server.listen(port, () => console.log(`App listining on port ${ port }`))