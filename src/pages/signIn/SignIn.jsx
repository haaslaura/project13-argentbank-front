import './signin.css'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
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


    return (
        <section className="sign-in-content">
            <i className="fa fa-user-circle sign-in-icon"></i>
            <h1>Sign In</h1>
            <SignInForm />
        </section>
    )
}

export default SignIn