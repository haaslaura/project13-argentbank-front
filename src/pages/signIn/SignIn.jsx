import './signin.css'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { disableDarkMode, enableDarkMode } from '../../layouts/main/themeSlice'
import SignInForm from '../../features/auth/SignInForm'
import { Navigate } from 'react-router-dom'


const SignIn = () => {
    const dispatch = useDispatch()
    // const navigate = useNavigate()

    const token = useSelector((state) => state.auth.token)
    console.log(token)    

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