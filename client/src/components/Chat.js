import Sidebar from "./Sidebar";
import ChatMain from "./ChatMain";

const Chat = ({info, messages, sendMessage, sendLocation, handleLogout}) => {

    return (
        <div className="chat">
            <Sidebar info = {info} handleLogout={handleLogout}/>
            <ChatMain messages = {messages} sendMessage = {sendMessage} sendLocation = {sendLocation} />
        </div>
    )
}

export default Chat