import { Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


/**
 * A wrapper component that protects routes by restricting access to authenticated users.
 * 
 * If the user is not authenticated and has not activated the "Remember me" option, 
 * they are redirected to the login page.
 * 
 * @param {Object} props - Component properties.
 * @param {React.ReactNode} props.children - The child components to render if access is granted.
 * 
 * @returns {JSX.Element} The child components if access is allowed, otherwise a redirect to the login page.
 */
const ProtectedRoute = ({ children }) => {

  const isAuthentificated = useSelector((state) => state.auth.isAuthentificated)  
  
  // If the user has activated "Remember me", check the token in the localStorage
  const token = localStorage.getItem('token')

  if (!isAuthentificated && !token && window.location.pathname !== "/") {
    return <Navigate to="/login" replace />
  }

  return children
}

export default ProtectedRoute