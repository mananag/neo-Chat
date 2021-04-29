import {useState} from 'react'
import MessageTemplate from "./MessageTemplate";
import LocationTemplate from "./LocationTemplate";

const ChatMain = ({messages, sendMessage, sendLocation}) => {
    const [message, setMessage] = useState('')

    const onSubmit = async (e) => {
        e.preventDefault()
        await sendMessage(message)
        setMessage('')
    }

    return(
        <div className="chatMain">
            <div id="messages" className="chatMessages">
                {messages.map(({type, text, createdAt, username}) => {
                    if(type === 'message'){
                        return <MessageTemplate key={createdAt} username={username} createdAt={createdAt} message={text} />
                    }
                    else if(type === 'location'){
                        return <LocationTemplate key={createdAt} username={username} createdAt={createdAt} location={text} />
                    }
                })}

            </div>
            <div className="compose">
                <form onSubmit={onSubmit}>
                    <input type="text" name="message" placeholder="Message" id="messageInput"
                           autoComplete="off"
                           value={message} onChange={e => {setMessage(e.target.value)}}
                    />
                    <button id="messageSubmit" type="submit" >
                        Send
                    </button>
                </form>
                <button id="sendLocation" onClick={sendLocation} >
                    Send Location
                </button>
            </div>
        </div>
    )
}

export default ChatMain