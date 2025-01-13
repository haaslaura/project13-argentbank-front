export async function fetchUserLogin(email, password) {
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })      
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }
        
        const data = await response.json()
        // console.log(data.message)
        return data.body.token
        
    } catch (error) {
        console.error('Error during login:', error.message)
        throw error
    }
}


export async function fetchUserProfile(token) {
    const response = await fetch('http://localhost:3001/api/v1/user/profile', {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    if (!response.ok) throw new Error('Invalid or expired token')
        return response.json()
}


export async function updateUserProfile(token, newFirstName, newLastName) {
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/profile', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                firstName: newFirstName,
                lastName: newLastName })
        })
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        const data = await response.json()
        console.log(data.body)
        return data

    } catch (error) {
        console.error('Error during sending data:', error.message)
        throw error
    }
}