import './account.css'

import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import bankTransactions from '../../mockdata/bankTransactions.json'
import { fetchUserProfile } from '../../services/userService'

import Profile from '../../features/editProfile/Profile'
import { setUser } from '../../features/user/userSlice'

import { disableDarkMode, enableDarkMode } from '../../layouts/main/themeSlice'
import TransactionWrapper from '../../components/transactionWrapper/TransactionWrapper'


const Account = () => {
    
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const token = useSelector((state) => state.auth.token)
    const { firstname, lastname } = useSelector((state) => state.user)
    
    const [profileData, setProfileData] = useState(null)
    const [error, setError] = useState(null)
    
    // Checks immediately for missing token
    if (!token) {
      navigate('/login')
      return null
    }

    // activates bg-dark on assembly, deactivates bg-dark on disassembly
    useEffect(() => {
        dispatch(enableDarkMode())
        return () => {
            dispatch(disableDarkMode())
          }
    }, []) 
    
    useEffect(() => {
        const fetchProfileData = async () => {
              
          try {
            const data = await fetchUserProfile(token)
            setProfileData(data.body)            
            dispatch(setUser({
                firstname: data.body.firstName,
                lastname: data.body.lastName,
                email: data.body.email,
            }))
          
          } catch (err) {
            setError('Network error.')
            console.error(err)
            navigate('/login')
          }
        }
    
      fetchProfileData()
    }, [token])
    
    if (error) return <p>{error}</p>
    if (!profileData) return <p>Loading...</p>
    
    return (
        <>
            <div className="header">
                <Profile
                  firstName={firstname}
                  lastName={lastname}
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