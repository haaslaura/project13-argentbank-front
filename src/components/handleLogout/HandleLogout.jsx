import { Link } from "react-router-dom"

const HandleLogout = () => {

    return (
        <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i> Sign Out
        </Link>
    )
}

export default HandleLogout