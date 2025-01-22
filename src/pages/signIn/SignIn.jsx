import './signin.css'

import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { disableDarkMode, enableDarkMode } from '../../layouts/main/themeSlice'

import SignInForm from '../../features/auth/SignInForm'


/**
 * Login page component.
 * 
 * Displays the login page with a form.
 * 
 * @component
 * @returns {JSX.Element} The Login page.
 */
const SignIn = () => {
    const dispatch = useDispatch()

    const token = useSelector((state) => state.auth.token)  

    // activates bg-dark on assembly, deactivates bg-dark on disassembly
    useEffect(() => {
        dispatch(enableDarkMode())
        return () => {
            dispatch(disableDarkMode())
          }
    }, [dispatch])


    if (token) return <Navigate to="/profile" replace />

    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <SignInForm />
        </section>
    )
}

export default SignIn