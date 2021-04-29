const Sidebar = ({info}) => {
    return (
        <div id="sidebar" className="chatSidebar">
            <h2 className="roomTitle">
                {info.room}
            </h2>
            <h3 className="listTitle">
                Users
            </h3>
            <ul className="users">
                {info.users.map(({username}) => {
                    return(<li key={username}>
                        {username}
                    </li>)
                })}
            </ul>
        </div>
    )
}

export default Sidebar