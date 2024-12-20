import { BrowserRouter, Route, Routes } from "react-router"
import './App.css'

import Header from '../layouts/header/Header'
import Footer from '../layouts/footer/Footer'
import Main from "../layouts/main/Main"

import Home from '../pages/home/Home'
import Error from "../pages/error/Error"
import SignIn from "../pages/signIn/SignIn"
import Account from "../pages/account/Account"

function App() {
  
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          {/* Parent route */}
          <Route path="/" element={<Main />} >
            {/* Children route */}
            <Route index element={<Home />} />
            <Route path="sign-in" element={<SignIn />} />
            <Route path="profile" element={<Account />} />
            <Route path="*" element={<Error />} />
          </Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App