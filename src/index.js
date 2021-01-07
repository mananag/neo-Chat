const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const {getMessage} = require('./utils/messages')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')



app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('New Web Socket Server')

    socket.emit('message', getMessage('Welcome'))
    socket.broadcast.emit('message', 'A new user has joined')

    socket.on('sendMessage', (message, callback) => {
        io.emit('message', getMessage(message))
        callback('Delivered')
    })

    socket.on('sendLocation', (coords, callback) => {
        const url = `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`
        io.emit('location', getMessage(url))
        callback()
    })

    socket.on('disconnect', () => {
        io.emit('message', 'A user has left!')
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})