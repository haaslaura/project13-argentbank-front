import './signInForm.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { fetchUserLogin } from '../../services/userService'
import { login } from '../auth/authSlice'


/**
 * SignInForm Component
 * @description Handles user authentication by collecting and validating user credentials, 
 * communicating with a backend API, and managing authentication state.
 * 
 * @component
 */
const SignInForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  // State management for form inputs and authentication status
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState(null)
 

  /**
   * Toggles the "Remember me" checkbox state
   */
  const handleChange = () => {
    setChecked(!checked)
  }

  /**
   * Sanitizes input to remove potentially malicious HTML characters
   * @param {string} input - The user input to sanitize
   * @returns {string} - The sanitized input string
   */
  const validateInput = (input) => {
    const sanitizedInput = input.replace(/[<>]/g, "")
    return sanitizedInput
  }
  
  /**
   * Handles the login process, including sanitizing input, sending the login request, 
   * and managing authentication state.
   * @async
   * @param {Event} e - The form submission event
   */
  const handleLogin = async (e) => {
    e.preventDefault()

    const sanitizedUsername = validateInput(username)
    const sanitizedPassword = validateInput(password)

    try {
      const token = await fetchUserLogin(sanitizedUsername, sanitizedPassword)
      
      // Stores the token if the user wishes to remember their session
      if (checked) {
        localStorage.setItem('token', token)
      }

      dispatch(login({ token, persist: checked }))
      navigate('/profile')

    } catch (err) {
      setError(err.message)
    }
  }
  
  return (
    <form onSubmit={handleLogin}>
      <div className="input-wrapper">
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
      </div>
      <div className="input-wrapper">
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      <div className="input-remember">
        <input
          type="checkbox"
          id="remember-me"
          checked={checked}
          onChange={handleChange}
        />
        <label htmlFor="remember-me">Remember me</label>
      </div>
      
      <button className="sign-in-button" type="submit" >Sign In</button>
      {error && <p style={{ color: 'red' }}>The username/password combination is incorrect</p>}
    </form>
  )
}

export default SignInForm