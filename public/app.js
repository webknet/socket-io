const socket = io('/')

const $usersCard = document.getElementById('usersCard')
const $userName = document.getElementById('inputLogin')
const $messages = document.getElementById('messages')
const $frm = document.getElementById('frmMsg')
const $login = document.getElementById('login')
const $logged = document.querySelector('.logged-in')

$frm.style.visibility = 'hidden'
$logged.style.display = 'none'

const connected = false

socket.on('logged users', users => {    
    users.forEach(user => {
        createUserCard(user)
    });
})

socket.on('message', arg => addMessage(arg))

socket.on('user joined', user => createUserCard(user))

socket.on('user left', id => removeUserCard(id))

function login() {
    socket.emit('new user', $userName.value, (data) => {
        $frm.style.visibility = 'visible'
        $logged.style.display = 'block'
        document.getElementById('user').innerText = data
        $login.style.display = 'none'
    })
}


function createUserCard(user) {
    let card = document.createElement('span')
    card.innerText = user.userName
    card.id = user.id
    card.classList.add('badge', 'mb-1', 'bg-primary')
    
    $usersCard.append(card)
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
    $messages.append(div)
}

$frm.addEventListener('submit', e => {
    e.preventDefault()
    let input = e.target.elements.messageSend
    socket.emit('message', input.value)
    input.value = ''
    input.focus()

    $messages.scrollTop = messages.scrollHeight
})