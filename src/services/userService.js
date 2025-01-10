// export const fetchUserLogin = async (email, password) => {
export async function fetchUserLogin(email, password) {
    try {
        const response = await fetch('http://localhost:3001/api/v1/user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })      

        console.log(response); // la réponse apparait dans la console
        
        if (!response.ok) {
            const errorData = await response.json()
            throw new Error(errorData.message)
        }

        const data = await response.json()
        console.log(data.message) // le message "User successfully logged in" apparait dans la console
        
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
    });
    if (!response.ok) throw new Error('Invalid or expired token')
    return response.json()
}