import './header.css'
import logo from '../../assets/argentBankLogo.svg'
import { Link } from 'react-router'
import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import IconButton from '../../components/iconButton/IconButton'


const Header = () => {

    const isAuthentificated = useSelector((state) => state.auth.isAuthentificated)
    const token = useSelector((state) => state.auth.token)
    const [firstName, setFirstName] = useState(null)

    useEffect(() => {
        const fetchFirstNameData = async () => {
          
            if (token) {
                try {
                    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
                        method: 'POST',
                        headers: {
                        'Authorization': `Bearer ${token}`,
                        },
                    })
    
                    if (response.ok) {
                        const data = await response.json()
                        setFirstName(data.body?.firstName)
        
                    } else {
                        setError('Invalid or expired token.')
                    }
    
                } catch (err) {
                    setError('Network error.')
                    console.error(err)
                }
            }
        }
        fetchFirstNameData()
    }, [token])

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
                    {
                        isAuthentificated ?
                            <div>
                                <IconButton 
                                    link="/profile"
                                    icon="fa fa-user-circle"
                                    buttonText={firstName}
                                />
                                <IconButton 
                                    link="/"
                                    icon="fa-solid fa-right-from-bracket"
                                    buttonText="Sign Out"
                                />
                            </div>
                        :
                            <div>
                                <IconButton 
                                    link="/profile"
                                    icon="fa fa-user-circle"
                                    buttonText="Sign In"
                                />
                            </div>
                    }
            </nav>
        </>
    )

}

export default Header