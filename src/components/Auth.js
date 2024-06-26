import React, { useEffect, useContext, useState } from 'react';
import { AuthContext } from './AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthToken = () => {
    const [msg, setMsg] = useState('');
    const navigate = useNavigate();
    const { setUserId } = useContext(AuthContext);

    axios.defaults.withCredentials = true;

    useEffect(() => {
        console.log("useEffect - verifyToken called"); // Added debugging point
        const verifyToken = async () => {
            try {
                // const res = await axios.get('http://localhost:5000/api/verify');
                const res = await axios.get('https://event-management-system-od1t.onrender.com/api/verify');


                console.log("API response:", res.data); // Log the API response
                setMsg(res.data.msg);
                if (res.data.msg !== "Successfully Verified") {
                    localStorage.removeItem('userId');
                } else {
                    const userId = res.data.userId;
                    setUserId(userId);
                    localStorage.setItem('userId', userId);
                }
            } catch (err) {
                console.error("Token verification failed:", err);
                localStorage.removeItem('userId');
                setMsg('Token verification failed'); // Fallback message
            }
        };

        verifyToken();
    }, []);

    useEffect(() => {
        console.log("useEffect - msg changed:", msg); // Added debugging point
            if(msg==='Wrong Token'){
                toast.error('Something went wrong',{ autoClose: 3000 }); 
                navigate('/')
            }        
    }, [msg, navigate]);

    return (
        <div>
            <ToastContainer />
        </div>
    );
};

export default AuthToken;
