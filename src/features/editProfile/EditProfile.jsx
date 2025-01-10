import { useDispatch } from 'react-redux'
import './editProfile.css'
import { disableEditingMode } from './editingSlice'
import { useState, useEffect } from "react"


const EditProfile = ({firstName, lastName}) => {
    
    // Function to close the editing mode
    const dispatch = useDispatch()
    const closeProfileEdit = ()  => {
        dispatch(disableEditingMode())
    }
    
    // EXEMPLE A MODIFIER
    // Declare a state variable to store the data
    const [data, setData] = useState(null);
    
    // Define the data to update
    const newData = {
        title: "How to Use Fetch to Make PUT Requests in React",
        content: "In this blog post, we will learn how to use the Fetch API to make PUT requests in React..."
    };
        
    // Define the request options
    const requestOptions = {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newData)
    };
        
    // Use the useEffect hook to make the request
    useEffect(() => {
        // Make the request
        fetch("https://example.com/api/posts/1", requestOptions)
        .then(response => response.json()) // Parse the response as JSON
        .then(data => setData(data)) // Update the state with the data
        .catch(error => console.error(error)); // Handle errors
    }, []); // Pass an empty array as the second argument to run the effect only once
    // EXEMPLE A MODIFIER
        
    return (
        <>
            <form id='editing-form' action="">
                
                <div className='edit-profil-form__section'>
                    <div id='one'>
                        <label className='edit-profile-label' htmlFor="username">First name</label> 
                        <input
                            type="text"
                            id="firstName"
                            placeholder={firstName}
                        />
                    </div>
                    <div id='two'>
                        <label className='edit-profile-label' htmlFor="username">Last Name</label> 
                        <input
                            type="text"
                            id="lastName"
                            placeholder={lastName}
                        />
                    </div>
                </div>

                <div className='edit-profil-form__section'>
                    <div id='three'>
                        <button
                            className='edit-button form-button'
                            type="submit"
                        >
                            Save
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