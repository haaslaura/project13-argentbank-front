import './editProfile.css'
import EditProfile from './EditProfile'
import { useDispatch, useSelector } from 'react-redux'
import { enableEditingMode } from './editingSlice'


const Profile = ({firstName, lastName}) => {
    
    const dispatch = useDispatch()
    const editing = useSelector((state) => state.edit.editingMode)

    const openProfileEdit = () => {
        dispatch(enableEditingMode())
    }

    return (
        <>
            <h1>Welcome back</h1>
            {!editing ?
                <>
                    <p id='user-name'>{firstName} {lastName}!</p>
                    <button className="edit-button" onClick={openProfileEdit}>Edit Name</button>
                </>
            :
                <>
                    <EditProfile 
                        firstName={firstName}
                        lastName={lastName}
                    />
                </>
            }
        </>
    )
}

export default Profile