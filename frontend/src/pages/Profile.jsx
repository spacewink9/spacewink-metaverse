import React, { useState } from 'react';
import './Profile.css';

function Profile() {
    const [profile, setProfile] = useState({
        name: 'John Doe',
        email: 'john.doe@example.com',
        avatar: 'https://via.placeholder.com/150'
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    return (
        <div className="profile">
            <h1>Profile</h1>
            <img src={profile.avatar} alt="User Avatar" className="avatar" />
            <form>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        name="name"
                        value={profile.name}
                        onChange={handleInputChange}
                    />
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input
                        type="email"
                        name="email"
                        value={profile.email}
                        onChange={handleInputChange}
                    />
                </div>
                <button type="button" className="save-button">
                    Save Changes
                </button>
            </form>
        </div>
    );
}

export default Profile;
