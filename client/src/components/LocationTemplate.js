import moment from "moment";

const LocationTemplate = ({username, createdAt, location}) => {
    return(
        <div className="message">
            <p>
                <span className="messageName">{username}</span>
                <span className="messageMeta">{moment(createdAt).format('LT')}</span>
            </p>
            <p>
                <a href={location}>
                    Current Location
                </a>
            </p>
        </div>
    )
}

export default LocationTemplate