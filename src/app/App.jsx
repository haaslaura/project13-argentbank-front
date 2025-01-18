import './app.css'

import { BrowserRouter, Route, Routes } from "react-router"
import { useDispatch } from "react-redux"
import { useEffect } from "react"

import { clearUser, fetchUserData } from "../features/user/userSlice"
import { login, logout } from "../features/auth/authSlice"

import Header from '../layouts/header/Header'
import Footer from '../layouts/footer/Footer'
import Main from "../layouts/main/Main"

import Home from '../pages/home/Home'
import Error from "../pages/error/Error"
import SignIn from "../pages/signIn/SignIn"
import Account from "../pages/account/Account"

import ProtectedRoute from "../components/protectedRoute/ProtectedRoute"


function App() {
  const dispatch = useDispatch()

  useEffect(() => {
    
    const localToken = localStorage.getItem("token")
    
    // If the token does not exist in the localStorage, a disconnection is performed
    if (!localToken) {
      dispatch(logout())
      dispatch(clearUser())

    } else {
      // Otherwise, we'll update the store
      dispatch(login({ localToken, isAuthentificated: true, persist: true }))
      dispatch(fetchUserData(localToken)).then((action) => {
        if (action.meta.requestStatus === "fulfilled") {
          console.log("User data loaded:", action.payload)
        } else {
          console.error("Failed to fetch user data:", action.error.message)
        }
      })
    }
  }, [dispatch])

  
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          
          {/* Parent route */}
          <Route path="/" element={<Main />} >
            
            {/* Children route */}
            <Route index element={<Home />} />
            <Route path="/login" element={<SignIn />} />
            <Route path="/profile" element={
              <ProtectedRoute>
                <Account />
              </ProtectedRoute>
              }
            />
            
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App