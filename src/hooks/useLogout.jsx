import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import { clearUser } from "../features/user/userSlice"
import { logout } from "../features/auth/authSlice"


export const useLogout = () => {

    const disptach = useDispatch()
    const navigate = useNavigate()

    const handleLogout = useCallback(
        (path) => {
            localStorage.removeItem('token')
            disptach(clearUser())
            disptach(logout())
            navigate(path)
        },
        [disptach, navigate]
    )

    return handleLogout
}

// Memo :
// useCallback ensures that handleLogout is stored between renderings and does not change as long as its dependencies (dispatch and navigate) remain the same.