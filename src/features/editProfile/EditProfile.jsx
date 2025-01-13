import './editProfile.css'
import { useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { disableEditingMode } from './editingSlice'
import { updateUserProfile } from '../../services/userService'
import { setUser } from '../user/userSlice'
import { useNavigate } from 'react-router-dom'


/**
 * Component for editing a user's profile.
 * Allows the user to update their first and last name, validate inputs, and save changes.
 *
 * @param {Object} props - Component props
 * @param {string} props.firstName - Initial first name of the user
 * @param {string} props.lastName - Initial last name of the user
 * @returns {JSX.Element} - The JSX representation of the EditProfile component
 */
const EditProfile = ({firstName, lastName}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()   

    const token = useSelector((state) => state.auth.token)

    const [actualLastName, setLastName] = useState(lastName)
    const [actualFirstName, setFirstName] = useState(firstName)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [error, setError] = useState(null)
    
    /**
     * Closes the profile editing mode.
     */
    const closeProfileEdit = ()  => {
        dispatch(disableEditingMode())
    }

    /**
     * Validates and sanitizes user input to prevent empty fields, excessive length, 
     * and disallowed characters.
     *
     * @param {string} input - The user input to sanitize and validate.
     * @throws Will throw an error if the input is empty or exceeds the allowed length.
     * @returns {string} - The sanitized input string.
     */
    const validateInput = (input) => {
        const sanitizedInput = input.trim().replace(/[=<>\[\];]/g, "")

        if (sanitizedInput.length === 0) {
            throw new Error("Input cannot be empty.")
        }
        if (sanitizedInput.length > 50) {
            throw new Error("Input is too long. Maximum 50 characters allowed.")
        }
        return sanitizedInput
  }

    /**
     * Handles the submission of the profile form to update the user's information.
     * Validates inputs, sends a request to update the profile, and updates the Redux state.
     *
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const saveNewProfile = async (e) => {
        e.preventDefault()

        // Prevent multiple simultaneous submissions
        if (isSubmitting) return
        setIsSubmitting(true)

        if (!token) {
            setError('Unauthenticated user.')
            navigate('/login')
            return
        }

        try {
            const sanitizedFirstName = validateInput(actualFirstName)
            const sanitizedLastName = validateInput(actualLastName)

            // Call API to update user profile
            const data = await updateUserProfile(
                token,
                sanitizedFirstName,
                sanitizedLastName
            )
            // Update Redux store with the new user details
            dispatch(
                setUser({
                    firstname: sanitizedFirstName,
                    lastname: sanitizedLastName,
                })
            )
            closeProfileEdit()

        } catch (err) {
            setError(err.message)
        } finally {
            setIsSubmitting(false)
        }
    }
            
    return (
        <>
            {error && <p className="error-message">{error}</p>}

            <form id='editing-form' onSubmit={saveNewProfile}>
                
                <div className='edit-profil-form__section'>
                    <div id='one'>
                        <label className='edit-profile-label' htmlFor="username">First name</label> 
                        <input
                            type="text"
                            id="firstName"
                            value={actualFirstName}
                            onChange={(e) => {
                                setFirstName(e.target.value)
                                setError(null) // Clears the error if modified
                            }}
                        />
                    </div>
                    <div id='two'>
                        <label className='edit-profile-label' htmlFor="username">Last Name</label> 
                        <input
                            type="text"
                            id="lastName"
                            value={actualLastName}
                            onChange={(e) => {
                                setLastName(e.target.value)
                                setError(null) // Clears the error if modified
                            }}
                        />
                    </div>
                </div>

                <div className='edit-profil-form__section'>
                    <div id='three'>
                        <button
                            className='edit-button form-button'
                            type="submit"
                            disabled={isSubmitting}
                            aria-busy={isSubmitting}
                        >
                            {isSubmitting ? "Saving..." : "Save"}
                        </button>
                    </div>
                    <div id='four'>
                        <button
                            className='edit-button form-button'
                            id='cancel-button'
                            type="button"
                            onClick={closeProfileEdit}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </form>
        </>
    )
}
    
export default EditProfile