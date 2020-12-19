const socket = io('/')

const usersCard = document.getElementById('usersCard')
const userName = document.getElementById('inputLogin')
const messages = document.getElementById('messages')

socket.on('connect', () => {    
    console.log(socket.id)
    socket.userName = 'Sabino'
    //setText.innerText = socket.id
})

socket.on('message', arg => {
    addMessage(arg)
})
socket.on('user joined', userName => {
    console.log(userName)   
})

socket.on('user left', id => {
    removeUserCard(id)
})

function login() {
    socket.emit('new user', userName.value)
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
    if (!card) return
    card.classList.add('bg-danger')
    card.innerText = `${ card.innerText } lef chat.`
    setTimeout(() => {        
        card.remove()
    }, 2000);
}

function addMessage(msg) {
    const div = document.createElement('div')
    div.id = msg.userId
    let template = `
            <h6 class="card-subtitle text-muted">
                ${ msg.userName } 
                <span class="badge bg-light text-dark">${msg.time}</span></h6>
            <p class="card-text">
                ${ msg.msg }
            </p>
        `
    div.classList.add('card', 'p-3', 'm-2')
    div.innerHTML = template
    messages.append(div)
}
