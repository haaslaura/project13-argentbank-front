/**
 * Logs in the user by sending their email and password to the server.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<string>} - A promise that resolves to the authentication token if the login is successful.
 * @throws {Error} - Throws an error if the login fails
 */
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


/**
 * Fetches the user's profile information from the server
 *
 * @param {string} token - The authentication token to authorize the request.
 * @returns {Promise<Object>} - A promise that resolves to the user's profile data.
 * @throws {Error} - Throws an error if the token is invalid or expired
 */
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


/**
 * Updates the user's profile with a new first name and last name
 *
 * @param {string} token - The authentication token to authorize the request.
 * @param {string} newFirstName - The new first name to update.
 * @param {string} newLastName - The new last name to update.
 * @returns {Promise<Object>} - A promise that resolves to the updated profile data.
 * @throws {Error} - Throws an error if the update fails
 */
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
        console.log(data.body) // Line to be commented on after the demonstration
        return data

    } catch (error) {
        console.error('Error during sending data:', error.message)
        throw error
    }
}