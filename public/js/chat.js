const socket = io()


const messages = document.getElementById('messages')
const messageTemplate = document.getElementById('messageTemplate').innerHTML

const autoScroll = () => {
    const newMessage = messages.lastElementChild

    const newMessageMargin = parseInt(getComputedStyle(newMessage).marginBottom)
    const newMessageHeight = newMessage.offsetHeight + newMessageMargin

    const visibleHeight = messages.offsetHeight
    const contentHeight = messages.scrollHeight
    const scrollOffset = messages.scrollTop + visibleHeight

    if (contentHeight - newMessageHeight <= scrollOffset) {
        messages.scrollTop = messages.scrollHeight
    }
}

// Socket message event
socket.on('message', (message) => {
    // console.log(message)
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message : message.text,
        createdAt : moment(message.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})


const locationTemplate = document.getElementById('locationTemplate').innerHTML

// Socket location event
socket.on('location', (location) => {
    // console.log(location)
    const html = Mustache.render(locationTemplate, {
        username: location.username,
        location : location.text,
        createdAt : moment(location.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

const sidebarTemplate = document.getElementById('sidebarTemplate').innerHTML

socket.on('roomData', ({ room, users }) => {
    // console.log(room, users)
    const html = Mustache.render(sidebarTemplate, {
        room,
        users
    })
    document.getElementById('sidebar').innerHTML = html
})

const messageButton = document.getElementById('messageSubmit')
const messageInput = document.getElementById('messageInput')

// Sending the message
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    messageButton.setAttribute('disabled', 'disabled')

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, m => {
        messageButton.removeAttribute('disabled')
        messageInput.value = ''
        messageInput.focus()
        console.log(m)                                  //Delivered Confirmation message
    })
})

const locationButton = document.getElementById('sendLocation')

// Sending location
locationButton.addEventListener('click', () => {

    locationButton.setAttribute('disabled', 'disabled')

    if (!navigator.geolocation) {
        return alert('Geolocation is not supported')    //Checking if browser support geolocation
    }

    navigator.geolocation.getCurrentPosition(position => {
        locationButton.removeAttribute('disabled')

        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }, () => {
            console.log('Location Shared!!')            // Location confirmation message
        })
    })
})

const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix : true
})


socket.emit('join', {username, room}, (error) => {
    if (error){
        alert(error)
        location.href = '/'
    }
})