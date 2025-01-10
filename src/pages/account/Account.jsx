import './account.css'
import bankTransactions from '../../mockdata/bankTransactions.json'
import AccountContentWrapper from '../../components/accountContentWrapper/AccountContentWrapper'
import { disableDarkMode, enableDarkMode } from '../../layouts/main/themeSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Profile from '../../features/editProfile/Profile'
import { setUser } from '../../features/user/userSlice'
import { fetchUserProfile } from '../../services/userService'


const Account = () => {
    
    const dispatch = useDispatch()
    const { firstname, lastname } = useSelector((state) => state.user)

    // activates bg-dark on assembly, deactivates bg-dark on disassembly
    useEffect(() => {
        dispatch(enableDarkMode())
        return () => {
            dispatch(disableDarkMode())
          }
    }, [])

    const token = useSelector((state) => state.auth.token)
    const [profileData, setProfileData] = useState(null)
    const [error, setError] = useState(null)
    const navigate = useNavigate()
    
    useEffect(() => {
        const fetchProfileData = async () => {
          
          if (!token) {
            setError('Unauthenticated user.')
            navigate('/login') // Redirects if no token
            return
          }
    
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
          }
        }
    
      fetchProfileData()
    }, [token, navigate])
    
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
                    <AccountContentWrapper
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