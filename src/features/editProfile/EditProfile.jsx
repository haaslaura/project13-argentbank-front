import './editProfile.css'


const EditProfile = ({firstName, lastName}) => {

    return (
        <>
            <h1>Welcome back</h1>
            <form action="">
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
                        <button className='edit-button form-button' type="submit" >Save</button>
                    </div>
                    <div id='four'>
                        <button className='edit-button form-button' id='cancel-button' type="">Cancel</button>
                    </div>
                </div>
            </form>
        </>
    )

}

export default EditProfile