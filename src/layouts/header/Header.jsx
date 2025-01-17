import './header.css'

import logo from '../../assets/argentBankLogo.svg'
import logoMobile from '../../assets/argentBankLogo_mobile.svg'

import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'

import IconButton from '../../components/iconButton/IconButton'
import { fetchUserProfile } from '../../services/userService'
import { setUser } from '../../features/user/userSlice'


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
    const dispatch = useDispatch()

    const isAuthentificated = useSelector((state) => state.auth.isAuthentificated)
    const token = useSelector((state) => state.auth.token)
    console.log(isAuthentificated)
    
    // const registredFirstName = useSelector((state) => state.user.firstname)

    const [firstName, setFirstName] = useState(null)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const [error, setError] = useState(null)
    
    
    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth <= 768)
        }
      
        window.addEventListener("resize", handleResize);
      
        // Cleaning the event listener
        return () => {
          window.removeEventListener("resize", handleResize)
        }
      }, [])


    // useEffect(() => {
    //     if(isAuthentificated) {
    //         setFirstName(registredFirstName)
    //     }
    // }, [registredFirstName])

    useEffect(() => {
        if(isAuthentificated) {
            const fetchProfileData = async () => {
                  
              try {
                const data = await fetchUserProfile(token)
                console.log(data);
                
                setFirstName(data.body.firstName)        
                dispatch(setUser({
                    firstname: data.body.firstName,
                    lastname: data.body.lastName,
                    email: data.body.email,
                }))
              
              } catch (err) {
                setError('Network error.')
                console.error(err)
              }
            }
        
            fetchProfileData()
        }
    }, [])


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