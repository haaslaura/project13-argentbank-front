import './signin.css'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { disableDarkMode, enableDarkMode } from '../../layouts/main/themeSlice'
import SignInForm from '../../features/auth/SignInForm'


const SignIn = () => {
    const dispatch = useDispatch()

    // activates bg-dark on assembly, deactivates bg-dark on disassembly
    useEffect(() => {
        dispatch(enableDarkMode())
        return () => {
            dispatch(disableDarkMode())
          }
    }, [])

    // If the user is already logged in, the Sign in button takes them to the profile page
    const isAuthentificated = useSelector((state) => state.auth.isAuthentificated)  
    const persist = useSelector((state) => state.auth.persist)
    const token = localStorage.getItem('token')
    
    if (isAuthentificated && (persist || token)) {
        return <Navigate to="/profile" replace />
    }

    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <SignInForm />
        </section>
    )
}

export default SignIn