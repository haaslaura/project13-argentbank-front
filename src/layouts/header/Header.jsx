import './header.css'
import logo from '../../assets/argentBankLogo.svg'
import { Link } from 'react-router'

// -> Sign out + User name si user connecté

const Header = () => {
    
    return (
        <>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img
                        className="main-nav-logo-image"
                        src={logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                <div>
                    <Link className="main-nav-item" to="sign-in">
                        <i className="fa fa-user-circle"></i> Sign In
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Header