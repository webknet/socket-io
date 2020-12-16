const socket = io('/')

const setText = document.getElementById('desc')
//setText.innerText = 'test'

socket.on('connect', () => {    
    console.log(socket.id)
    socket.userName = 'Sabino'
    setText.innerText = socket.id
})

socket.on('hello', arg => {
    console.log(arg)
})


function onClick(e) {
    const msg = document.getElementById('msg')
   
    socket.emit('message', msg.value )
}
