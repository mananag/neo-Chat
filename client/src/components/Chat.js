import Sidebar from "./Sidebar";
import ChatMain from "./ChatMain";

const Chat = ({info, messages, sendMessage, sendLocation}) => {

    return (
        <div className="chat">
            <Sidebar info = {info} />
            <ChatMain messages = {messages} sendMessage = {sendMessage} sendLocation = {sendLocation} />
        </div>
    )
}

export default Chat