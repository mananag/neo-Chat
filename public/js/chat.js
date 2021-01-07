const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message, m => {
        console.log(m)
    })
})

document.getElementById('send-location').addEventListener('click', () => {
    if (!navigator.geolocation) {
        return alert('Geolocation is not supported')
    }

    navigator.geolocation.getCurrentPosition(position => {
        // console.log(position)
        socket.emit('sendLocation', {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        })
    })
})