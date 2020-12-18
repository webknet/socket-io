const socket = io('/')

const usersCard = document.getElementById('usersCard')
const userName = document.getElementById('inputLogin')


socket.on('connect', () => {    
    console.log(socket.id)
    socket.userName = 'Sabino'
    //setText.innerText = socket.id
})

socket.on('message', arg => {
    console.log(arg)
})
socket.on('user joined', userName => {
    console.log(userName)
    createUserCard(userName)
})

socket.on('user left', id => {
    removeUserCard(id)
})

function login() {
    //socket.userName = userName.value 
    socket.emit('new user', userName.value)
    console.log(socket)
}

function addUser() {
    socket.emit('add user', 'sabino')
}


function createUserCard(user) {
    let card = document.createElement('span')
    card.innerText = user.userName
    card.id = user.id
    card.classList.add('badge', 'mb-1', 'bg-primary')
    
    usersCard.append(card)
}

function removeUserCard(id) {
    let card = document.getElementById(id)
    card.classList.add('bg-danger')
    card.innerText = `${ card.innerText } lef chat.`
    setTimeout(() => {        
        card.remove()
    }, 2000);
}

function addMessage() {

}
