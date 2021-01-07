const socket = io()


const messages = document.getElementById('messages')
const messageTemplate = document.getElementById('messageTemplate').innerHTML

// Socket message event
socket.on('message', (message) => {
    console.log(message)
    const html = Mustache.render(messageTemplate, {
        message : message.text,
        createdAt : moment(message.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html)
})


const locationTemplate = document.getElementById('locationTemplate').innerHTML

// Socket location event
socket.on('location', (location) => {
    console.log(location)
    const html = Mustache.render(locationTemplate, {
        location : location.text,
        createdAt : moment(location.createdAt).format('h:mm a')
    })
    messages.insertAdjacentHTML('beforeend', html)
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

const locationButton = document.getElementById('send-location')

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