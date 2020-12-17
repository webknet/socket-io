const socket = io('/')

const usersCard = document.getElementById('usersCard')

createUserCard()

socket.on('connect', () => {    
    console.log(socket.id)
    socket.userName = 'Sabino'
    //setText.innerText = socket.id
})

socket.on('hello', arg => {
    console.log(arg)
})
socket.on('user joined', userName => {
    console.log(userName)
})

function onClick(e) {
    const msg = document.getElementById('msg')
   
    socket.emit('message', msg.value )
}

function addUser() {
    socket.emit('add user', 'sabino')
}


function createUserCard() {
    let card = document.createElement('div')
    card.innerText = 'Teixeira'
    card.id = '0001'
    card.classList.add('badge', 'mb-1', 'bg-primary')
    
    usersCard.append(card)
}
