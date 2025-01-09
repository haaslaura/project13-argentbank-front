import './signInForm.css'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { login } from './authSlice'

const SignInForm = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [checked, setChecked] = useState(false)
  const [error, setError] = useState(null) 

  const handleChange = () => {
    setChecked(!checked)
  }
  
  const handleLogin = async (e) => {
    e.preventDefault()   
    
    try {
      const response = await fetch('http://localhost:3001/api/v1/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: username, password }),
      })      
      
      if (response.ok) {
        const data = await response.json()
        const token = data.body.token
        // console.log('Token received:', data.body.token)

        if (checked) {
          localStorage.setItem('token', token);
        }        

        dispatch(login({ token, persist: checked }))
        navigate('/profile')
        
      } else {
        const errorData = await response.json()
        setError(errorData.message)
      
      }
    } catch (err) {
      console.error('Network error:', err)
      setError('An error has occurred. Please try again.')
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