import './account.css'
import AccountContentWrapper from '../../components/accountContentWrapper/AccountContentWrapper'
import { disableDarkMode, enableDarkMode } from '../../layouts/main/themeSlice'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

// Penser au Header
// -> Sign out + User name

const arrayTestAccountContent = [
    {
        title: "Argent Bank Checking (x8349)",
        amount: "$2,082.79",
        description: "Available Balance",
    }, 
    {
        title: "Argent Bank Savings (x6712)",
        amount: "$10,928.42",
        description: "Available Balance",
    },
    {
        title: "Argent Bank Credit Card (x8349)",
        amount: "$184.30",
        description: "Current Balance",
    }
]

const Account = () => {
    
    // activates bg-dark on assembly, deactivates bg-dark on disassembly
    const dispatch = useDispatch()
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
            const response = await fetch('http://localhost:3001/api/v1/user/profile', {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`,
              },
            })

            if (response.ok) {
              const data = await response.json()
              // console.log(data.message)
              setProfileData(data.body)

            } else {
              setError('Invalid or expired token.')
              navigate('/signin')
            }

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
                <h1>Welcome back<br />{profileData?.firstName} {profileData?.lastName}!</h1>
                <button className="edit-button">Edit Name</button>
            </div>
            
            <h2 className="sr-only">Accounts</h2>
            {
                arrayTestAccountContent.map((item, index) => (
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