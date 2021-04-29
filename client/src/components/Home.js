import LoginForm from "./LoginForm";
import Chat from "./Chat";
import * as React from "react";
import socketClient from "socket.io-client";

const socket = socketClient("http://localhost:8080/")

class Home extends React.Component {
    state = {
        info: {},
        messages: []
    }

    async componentDidMount() {
        try {
            let info = localStorage.getItem('info')
            info = info.split(',')
            if (info) {
                await this.setState(() => {
                        info = {
                            username: info[0],
                            room: info[1],
                            users: []
                        }
                        return {info}
                    },
                    () => {

                    })
                this.configureSocketIo()

                socket.emit('join', this.state.info, e => {

                })
            }
        } catch (e) {
            //Do Nothing
        }
    }

    configureSocketIo = () => {
        socket.on('message', message => {
            this.setState((prevState) => {
                if(prevState.messages.length >= 1){
                    return {
                        messages: prevState.messages.concat([message])
                    }
                }
                else {
                    return {
                        messages: [message]
                    }
                }
            }, () => {

            })
        })

        socket.on('location', message => {
            this.setState((prevState) => {
                if(prevState.messages.length >= 1){
                    return {
                        messages: prevState.messages.concat([message])
                    }
                }
                else {
                    return {
                        messages: [message]
                    }
                }
            }, () => {

            })
        })
        socket.on('roomData', ({ room, users }) => {
            this.setState((prevState) => {
                const info = {
                    ...prevState.info,
                    users
                }
                return {info}
                // console.log(this.state)
            })
        })
    }

    sendMessage = (message) => {
        socket.emit('sendMessage', message, m => {
            console.log(m)
        })
    }

    sendLocation = () => {
        navigator.geolocation.getCurrentPosition(position => {
            console.log('LOCATION')
            // locationButton.removeAttribute('disabled')
            socket.emit('sendLocation', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            }, () => {
                console.log('Location Shared!!')            // Location confirmation message
            })
        })
    }

    handleLogin = async (username, room) => {
        localStorage.setItem('info', [username, room])
        await this.setState(() => ({
            info: {
                username, room
            }
        }))
        window.location.href = '/'
    }

    handleLogout = () => {
        localStorage.clear()
        window.location.href = '/'
    }

    render() {
        return (
            <div >
                {
                    this.state.info.username ?
                        <Chat
                            info={this.state.info}
                            messages={this.state.messages}
                            sendMessage = {this.sendMessage}
                            sendLocation = {this.sendLocation}
                            handleLogout = {this.handleLogout}
                        /> : <LoginForm handleLogin={this.handleLogin} />
                }
            </div>
        )
    }
}

export default Home