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
            {!editing ?
                <>
                    <h1>Welcome back<br />{firstName} {lastName}!</h1>
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