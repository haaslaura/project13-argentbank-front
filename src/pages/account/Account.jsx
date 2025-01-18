import './account.css'

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import bankTransactions from '../../mockdata/bankTransactions.json'

import Profile from '../../features/editProfile/Profile'
import { fetchUserData } from '../../features/user/userSlice'

import { disableDarkMode, enableDarkMode } from '../../layouts/main/themeSlice'
import TransactionWrapper from '../../components/transactionWrapper/TransactionWrapper'
import { useLogout } from '../../hooks/useLogout'


const Account = () => {
    
    const dispatch = useDispatch()
    const handleLogout = useLogout()

    const token = useSelector((state) => state.auth.token)
    const { firstName, lastName, status } = useSelector((state) => state.user)
    const [error, setError] = useState(null)


    // activates bg-dark on assembly, deactivates bg-dark on disassembly
    useEffect(() => {
        dispatch(enableDarkMode())
        return () => {
            dispatch(disableDarkMode())
          }
    }, [dispatch]) 
    

    useEffect(() => {
      
      if (!token) {
        handleLogout('/login')
      } 

      dispatch(fetchUserData(token))
        .unwrap()
        .catch((err) => {
          console.error(err)
          setError("Network error or authentication problem.")
          handleLogout('/login')
        })       
      
    }, [dispatch, handleLogout])
    

    if (error) return <p>{error}</p>
    if (status === "loading") return <p>Loading...</p>
    

    return (
        <>
            <div className="header">
                <Profile
                  firstName={firstName}
                  lastName={lastName}
                />
            </div>
            
            <h2 className="sr-only">Accounts</h2>
            {
                bankTransactions.map((item, index) => (
                    <TransactionWrapper
                        key={index}
                        title={item.title}
                        amount={item.amount}
                        description={item.description}
                    />
                ))
            }
        </>
    )
}

export default Account