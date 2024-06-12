import React, { useState } from 'react';
import './styles/login.css';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import Loader from './load';

const Login = ({setIsLoggedIn}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    // const [islog,setlog]=useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
    
        try {
            const res = await axios.post(`https://event-management-system-od1t.onrender.com/api/auth/login`, { email, password });
            // const res = await axios.post(`http://localhost:5000/api/auth/login`, { email, password });

            if (res.data.msg === 'Login Successful') {
                localStorage.setItem('userId', res.data.userId); 
                navigate('/dashboard'); // Navigate to loading screen
                console.log("Login Successful")
                setLoading(false);
                setIsLoggedIn(true);
            } else {
                toast.error(res.data.msg,{ autoClose: 3000 });
                setLoading(false)
            }
        } catch (err) {
            console.error("Login failed:", err);
            toast.error('Login failed',{ autoClose: 3000 });
            setLoading(false)
        } finally {
            setLoading(false);
        }
    };

        
    

    if (loading) {
        return <Loader />;
    }

    const handleSignup = () => {
        navigate('/signup');
    }

    const handleEnter = (e) => {
        if (e.key === "Enter") {
            handleSubmit(e);
        }
    }

    return (
        <div className='login-body'>
            <div className='login-container'>
                <div className='login-content'>
                    <div className='login-form'>
                        <div className='login-head'>
                            <h1>Login</h1>
                        </div>
                        <div className="login-input">
                            <input
                                type='email'
                                placeholder='Email'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="login-input">
                            <input
                                type='password'
                                placeholder='Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyDown={handleEnter}
                            />
                        </div>
                        <div className='login-text'>
                            <p>Don't have an account? <span className='login-text-span' onClick={handleSignup}>Sign up</span></p>
                        </div>
                        <div className="login-button">
                            <button onClick={handleSubmit}>Submit</button>
                        </div>
                    </div>
                </div>
                <ToastContainer />
            </div>
        </div>
    );
}

export default Login;
