import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


const ProtectedRoute = ({ children }) => {

  const isAuthentificated = useSelector((state) => state.auth.isAuthentificated)  
  const persist = useSelector((state) => state.auth.persist)
  
  // If the user has activated "Remember me", check the token in the localStorage
  const token = localStorage.getItem('token')

  if (!isAuthentificated && (!persist || !token)) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute