const socket = io('/')

socket.on('connect', () => {
    console.log(socket.id)
})

socket.on('hello', arg => {
    console.log(arg)
})


