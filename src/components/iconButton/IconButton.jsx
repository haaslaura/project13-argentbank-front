import './iconButton.css'
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { logout } from "../../features/auth/authSlice"
import { clearUser } from '../../features/user/userSlice'


/**
 * A reusable button component with an icon and optional logout functionality.
 *
 * The `IconButton` displays a button with an icon and text. It supports custom links
 * and includes logout functionality when the "Sign Out" button is clicked.
 *
 * @component
 * @param {Object} props - The properties of the component
 * @param {string} props.link - The URL or route the button should navigate to
 * @param {string} props.icon - The CSS class for the icon to display (e.g., FontAwesome classes)
 * @param {string} props.buttonText - The text to display on the button
 * @returns {JSX.Element} The IconButton component
 */
const IconButton = ({link, icon, buttonText}) => {
    const dispatch = useDispatch()

    const handleLogout = () => {
        if (buttonText === "Sign Out") {        
            localStorage.removeItem('token')
            dispatch(clearUser())
            dispatch(logout())
        }
    }

    return (
        <>
            <Link
                className="main-nav-item"
                to={link}
                onClick={handleLogout}
            >
                <i className={icon}></i> {buttonText}
            </Link>
        </>
    )
}

export default IconButton