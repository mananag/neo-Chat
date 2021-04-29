import moment from 'moment'

const MessageTemplate = ({username, message, createdAt}) => {
    return(
        <div className="message">
            <p>
                <span className="messageName">{username} </span>
                <span className="messageMeta">{moment(createdAt).format('LT')}</span>
            </p>
            <p>
                {message}
            </p>
        </div>
    )
}

export default MessageTemplate