import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const ProtectedRoute = ({ children }) => {

  const isAuthentificated = useSelector((state) => state.auth.isAuthentificated)  
  
  if (!isAuthentificated) {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute