import React, { useEffect, useState } from 'react';
import './styles/profile.css'
import axios from 'axios';

const Profile = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/user/userprofile/${userId}`)
            .then((res) => {
                if (res.data.msg === 'Profile data fetched') {
                    setUser(res.data.pro);
                }
            })
            .catch((err) => {
                console.log("Unable to fetch the profile data", err);
            });
    }, [userId]);

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = () => {
        // Update user details on the backend
        axios.put(`http://localhost:5000/api/auth/user/update/${userId}`, user)
            .then((res) => {
                console.log(res.data.msg); // Success message
                setEditMode(false);
            })
            .catch((err) => {
                console.log("Unable to update user details", err);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setUser(prevUser => ({
            ...prevUser,
            profile: {
                ...prevUser.profile,
                imageurl: imageURL,
                file: file
            }
        }));
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <div className='profile-body'>
            <div className='profile-content'>
                <div className='profile-container'>
                    <div className='profile-details'>
                        <div className="profile-image">
                            {user.profile?.imageurl ? (
                                <img src={user.profile.imageurl} alt='Profile' />
                            ) : (
                                <span>No Image</span>
                            )}
                            {editMode ? (
                                <input type="file" onChange={handleImageChange} accept="image/*" />
                            ) : null}
                        </div>
                        <h2>{user.name}</h2>
                        <p>Email: {user.email}</p>
                        {editMode ? (
                            <div>
                                <input
                                    type="text"
                                    name="name"
                                    value={user.name}
                                    onChange={handleChange}
                                />
                                <input
                                    type="email"
                                    name="email"
                                    value={user.email}
                                    onChange={handleChange}
                                />
                            </div>
                        ) : null}
                        <div className='profile-buttons'>
                            {editMode ? (
                                <button onClick={handleSave}>Save</button>
                            ) : (
                                <button onClick={handleEdit}>Edit</button>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
