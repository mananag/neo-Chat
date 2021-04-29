import {useState} from "react";

const LoginForm = ({handleLogin}) => {
    const [username, setUsername] = useState('')
    const [room, setRoom] = useState('')

    const onSubmit = (e) => {
        e.preventDefault()
        console.log(e.target)
        handleLogin(username, room)
    }

    return (
        <div className="centeredForm">
            <div className="centeredFormBox">
                <h1>
                    Join
                </h1>
                <form onSubmit={onSubmit} autoComplete="off">
                    <label>
                        Display Name
                    </label>
                    <input type="text" name="username" placeholder="Display name" required
                           value={username} onChange={(e) => {setUsername(e.target.value)}} />
                    <label>
                        Room
                    </label>
                    <input type="text" name="room" placeholder="Room" required
                           value={room} onChange={(e) => {setRoom(e.target.value)}}/>
                    <button type="submit">
                        Join
                    </button>
                </form>
            </div>
        </div>
    )
}

export default LoginForm