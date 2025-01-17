import { BrowserRouter, Route, Routes } from "react-router"
import { useDispatch } from "react-redux"
import { useEffect } from "react"
import { login, logout } from "../features/auth/authSlice"

import './app.css'

import Header from '../layouts/header/Header'
import Footer from '../layouts/footer/Footer'
import Main from "../layouts/main/Main"

import Home from '../pages/home/Home'
import Error from "../pages/error/Error"
import SignIn from "../pages/signIn/SignIn"
import Account from "../pages/account/Account"

import ProtectedRoute from "../components/protectedRoute/ProtectedRoute"


function App() {

  // TEST
  const dispatch = useDispatch()

  useEffect(() => {
    console.log("lancement de App");
    
    const localToken = localStorage.getItem("token")
    console.log("localToken: " + localToken);
    
    // Si le token n'est pas en local, on effectue une déconnexion propre
    if (!localToken) {
      dispatch(logout())
    
      // Si le token est présent en local, on remet le store à jour
    } else {
      dispatch(login({ localToken, isAuthentificated: true, persist: true }))
      // comment on réinjecte le user donc ?
      
    }

  }, [])
  // FIN TEST
  
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