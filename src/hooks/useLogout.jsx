import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearUser } from "../features/user/userSlice"
import { logout } from "../features/auth/authSlice"


/**
 * A custom React hook to handle user logout functionality.
 * 
 * @returns {Function} A memoized function `handleLogout` that accepts a path and performs the logout logic.
 * 
 * @example
 * // Usage in a React component
 * const handleLogout = useLogout();
 * 
 * // Trigger logout and redirect to the login page
 * handleLogout('/login');
 */
export const useLogout = () => {

    const disptach = useDispatch()
    const navigate = useNavigate()

    const handleLogout = useCallback(
        (path) => {
            localStorage.removeItem('token') // Removes the authentication token from localStorage
            disptach(clearUser()) // Clears user data from the Redux store
            disptach(logout()) // Dispatches a logout action to update the authentication state in Redux
            navigate(path) // Redirects the user to a specified path
        },
        [disptach, navigate]
    )

    return handleLogout
}

// Memo :
// useCallback ensures that handleLogout is stored between renderings and does not change as long as its dependencies (dispatch and navigate) remain the same.