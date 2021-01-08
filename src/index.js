const path = require('path')
const http = require('http')
const express = require('express')
const socketio = require('socket.io')

const {getMessage} = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = http.createServer(app)
const io = socketio(server)

const port = process.env.PORT || 3000
const publicDirectoryPath = path.join(__dirname, '../public')



app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('New Web Socket Server')
    // socket.broadcast.emit('message', 'A new user has joined')

    socket.on('join', ({username, room}, callback) => {
        const {error, user} = addUser({ id: socket.id, username, room})

        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', {...getMessage('Welcome!!'), username: user.username})
        socket.broadcast.to(room).emit('message', getMessage(`${user.username} has joined the chat!!`))

        callback()

    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', {...getMessage(message), username: user.username})
            callback('Delivered')
        }
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)

        if(user){
            const url = `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`
            io.to(user.room).emit('location', {...getMessage(url), username: user.username})
            callback()
        }
    })

    socket.on('disconnect', () => {
        const user= removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', {...getMessage(` ${user.username} has left!`),
                username: user.username})
        }
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})