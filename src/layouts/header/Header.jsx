import './header.css'

import logo from '../../assets/argentBankLogo.svg'
import logoMobile from '../../assets/argentBankLogo_mobile.svg'

import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'

import IconButton from '../../components/iconButton/IconButton'


/**
 * Component for displaying the main navigation header.
 *
 * This component dynamically displays different options in the header 
 * depending on the user's authentication status. If the user is authenticated, 
 * their first name is displayed along with a "Sign Out" button. 
 * Otherwise, a "Sign In" button is shown.
 *
 * @component
 * @returns {JSX.Element} The Header component
 */
const Header = () => {

    const isAuthentificated = useSelector((state) => state.auth.isAuthentificated)
    const registredFirstName = useSelector((state) => state.user.firstname)

    const [firstName, setFirstName] = useState(null)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    
    
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768);
        }
      
        window.addEventListener("resize", handleResize);
      
        // Cleaning the event listener
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, [])


    useEffect(() => {
        if(isAuthentificated) {
            setFirstName(registredFirstName)
        }
    }, [registredFirstName])

    return (
        <>
            <nav className="main-nav">
                <Link className="main-nav-logo" to="/">
                    <img
                        className="main-nav-logo-image"
                        src={isMobile ? logoMobile : logo}
                        alt="Argent Bank Logo"
                    />
                    <h1 className="sr-only">Argent Bank</h1>
                </Link>
                    {isAuthentificated ? (
                        <div>
                            <IconButton 
                                link="/profile"
                                icon="fa fa-user-circle"
                                buttonText={firstName || "Loading..."}
                            />
                            <IconButton 
                                link="/"
                                icon="fa-solid fa-right-from-bracket"
                                buttonText="Sign Out"
                            />
                        </div>
                    ) : (
                        <>
                            <IconButton 
                                link="/profile"
                                icon="fa fa-user-circle"
                                buttonText="Sign In"
                            />
                        </>
                    )}
            </nav>
        </>
    )

}

export default Header