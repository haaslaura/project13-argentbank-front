import { Link } from "react-router-dom"
import './iconButton.css'

const IconButton = ({link, icon, buttonText}) => {

    return (
        <>
            <Link className="main-nav-item" to={link}>
                <i className={icon}></i> {buttonText}
            </Link>
        </>
    )
}

export default IconButton