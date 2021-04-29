const path = require('path')
const https = require('http')
const express = require('express')
const socketio = require('socket.io')

const {getMessage} = require('./utils/messages')
const { addUser, removeUser, getUser, getUsersInRoom } = require('./utils/users')

const app = express()
const server = https.createServer(app)
const io = socketio(server, {
    cors: {
        origin: '*',
    }
})

const port = process.env.PORT || 8080
const publicDirectoryPath = path.join(__dirname, '../public')



// app.use(express.static(publicDirectoryPath))


io.on('connection', (socket) => {
    console.log('New Web Socket Server')
    // socket.broadcast.emit('message', 'A new user has joined')

    socket.on('join', ({username, room}, callback) => {
        const {error, user} = addUser({ id: socket.id, username, room})
        if (error) {
            return callback(error)
        }

        socket.join(user.room)

        socket.emit('message', {...getMessage('Welcome!!', 'message'), username: 'Admin'})
        socket.broadcast.to(room).emit('message', getMessage(`${user.username} has joined the chat!!`))

        io.to(user.room).emit('roomData', {
            room : user.room,
            users : getUsersInRoom(user.room)
        })

        callback()

    })

    socket.on('sendMessage', (message, callback) => {
        const user = getUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', {...getMessage(message, 'message'), username: user.username})
            callback('Delivered')
        }
    })

    socket.on('sendLocation', (coords, callback) => {
        const user = getUser(socket.id)

        if(user){
            const url = `https://www.google.com/maps/search/?api=1&query=${coords.latitude},${coords.longitude}`
            io.to(user.room).emit('location', {...getMessage(url, 'location'), username: user.username})
            callback()
        }
    })

    socket.on('disconnect', () => {
        const user= removeUser(socket.id)

        if (user) {
            io.to(user.room).emit('message', {...getMessage(` ${user.username} has left!`),
                username: user.username})
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            })
        }
    })
})


server.listen(port, () => {
    console.log(`Server is up on port ${port}!`)
})