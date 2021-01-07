const socket = io()

socket.on('message', (message) => {
    console.log(message)
})

console.log(document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault()

    const message = e.target.elements.message.value

    socket.emit('sendMessage', message)
}))