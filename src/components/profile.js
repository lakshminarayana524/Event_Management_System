import React, { useEffect, useState } from 'react';
import './styles/profile.css';
import axios from 'axios';
import Load from './load';
import { useNavigate } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import Myevents from './myevents';
import Catalogs from './Catalogs';
import Tickets from './ticket';
import CancelledEvents from './CancelledEvents';

const Profile = () => {
    const userId = localStorage.getItem('userId');
    const [user, setUser] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [file, setFile] = useState(null);
    const [load, setLoad] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        setLoad(true);
        if (userId) {
            // Fetch user profile data
            axios.get(`https://event-management-system-od1t.onrender.com/api/user/user/${userId}`)
            // axios.get(`http://localhost:5000/api/user/user/${userId}`)

                .then((res) => {
                    if (res.data.msg === 'Profile data fetched') {
                        setUser(res.data.pro);
                        setLoad(false);
                    }
                })
                .catch((err) => {
                    setLoad(false);
                    console.log("Unable to fetch the profile data", err);
                });
        } else {
            setLoad(false);
        }
    }, [userId]);

    const handleEdit = () => {
        setEditMode(!editMode);
    };

    const handleSave = async () => {
        setLoad(true);
        const formData = new FormData();
        formData.append('userId', userId);
        formData.append('name', user.name);
        formData.append('email', user.email);
        formData.append('phone', user.phone);

        if (file) {
            formData.append('image', file);
        }

        try {
            // const res = await axios.put(`http://localhost:5000/api/user/update/${userId}`, formData);
            const res = await axios.put(`https://event-management-system-od1t.onrender.com/api/user/update/${userId}`, formData);
            console.log(res.data.msg); // Success message
            setUser(res.data.user);
            setLoad(false);
            setEditMode(false);
        } catch (err) {
            console.log("Unable to update user details", err);
            setLoad(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({ ...prevUser, [name]: value }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const imageURL = URL.createObjectURL(file);
        setFile(file);
        setUser(prevUser => ({
            ...prevUser,
            profile: {
                ...prevUser.profile,
                imageurl: imageURL
            }
        }));
    };

    const handleLog = () => {
        navigate('/login');
    };

    const handleEventClick = (eventname, eventId) => {
        setSelectedEvent({ eventname, eventId });
    };

    if (load) {
        return <Load />;
    }

    if (!user) {
        return <div className="log">Please <span className="splan" onClick={handleLog}>Login</span></div>;
    }

    return (
        <div className="profile-page-container">
            <div className="profile-container">
                <div className="profile-content">
                    <div className="profile-header">
                        <div className="profile-image">
                            {user.profile?.imageurl ? (
                                <img src={user.profile.imageurl} alt="Profile" />
                            ) : (
                                <span className="no-image">No Image</span>
                            )}
                            {editMode ? (
                                <input type="file" onChange={handleImageChange} accept="image/*" />
                            ) : null}
                        </div>
                        <div className="profile-details">
                            <div className="profile-text">
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
                                        <input
                                            type="text"
                                            name="phone"
                                            value={user.phone || ''}
                                            onChange={handleChange}
                                        />
                                    </div>
                                ) : (
                                    <>
                                        <h2>{user.name}</h2>
                                        <p>Email: {user.email}</p>
                                        <p>Phone: {user.phone || 'N/A'}</p>
                                    </>
                                )}
                            </div>
                            <div className="profile-edit-icon">
                                {editMode ? (
                                    <button onClick={handleSave}>Save</button>
                                ) : (
                                    <FaEdit onClick={handleEdit} />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="sections-container">
                <div className="section">
                    <h2>Catalogs</h2>
                    <Catalogs />
                </div>
                <div className="section">
                    <h2>Events</h2>
                    <Myevents userId={userId} onEventClick={handleEventClick} />
                </div>
                {/* <div className="section">
                    <h2>Tickets</h2>
                    <Tickets />
                </div> */}
                <div className="section">
                    <h2>Cancelled Events</h2>
                    <CancelledEvents />
                </div>
            </div>
            {selectedEvent && selectedEvent.eventname && selectedEvent.eventId && (
                <div className="selected-event-details">
                    <h2>Event Details</h2>
                    <p>Name: {selectedEvent.eventname}</p>
                    <p>ID: {selectedEvent.eventId}</p>
                    {/* Add other details as needed */}
                </div>
            )}

        </div>
    );
};

export default Profile;
