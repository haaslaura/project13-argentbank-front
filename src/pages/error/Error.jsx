import Home from '../home/Home'
import { Link } from 'react-router'
import './error.css'
import { useDispatch } from 'react-redux'
import { disableDarkMode, enableDarkMode } from '../../layouts/main/themeSlice'
import { useEffect } from 'react'


/**
 * Error 404 page component.
 * 
 * Displays an error message and invites user to return to the home page with a link button. 
 * 
 * @component
 * @returns {JSX.Element} The Error page.
 */
const Error = () => {
    const dispatch = useDispatch()

    // activates bg-dark on assembly, deactivates bg-dark on disassembly
    useEffect(() => {
        dispatch(enableDarkMode())
        return () => {
            dispatch(disableDarkMode())
          }
    }, [])
    
    return (
        <div className="error-container">
            <h1>404 Error</h1>
            <h2>The requested page does not exist.</h2>
            <Link to="/" element={<Home />}>You can return to the home page by clicking here.</Link>
        </div>
    )
}

export default Error