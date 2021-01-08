const users = [{}]

const addUser = ({id, username, room}) => {
    // Cleaning Data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validating Data
    if(!username || !room) {
        return {
            error: 'Username and room is required'
        }
    }

    // Checking existing user
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    // Validating username
    if (existingUser) {
        return {
            error: 'Username is taken!:('
        }
    }

    // Store User
    const user = { id, username, room}
    users.push(user)
    return { user }
}

// Removing User
const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if (index !== -1){
        return users.splice(index, 1)[0]
    }
}

// Getting User
const getUser = (id) => {
    return users.find((u) => {
        return u.id === id
    })
}

// All users in room
const getUsersInRoom = (room) => {
    room = room.trim().toLowerCase()
    return users.filter((user) => user.room === room)
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom
}