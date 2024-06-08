import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Nav = ({ isLoggedIn, setIsLoggedIn }) => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));

  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios.post('http://localhost:5000/api/auth/logout')
      .then((res) => {
        localStorage.removeItem('userId');
        setUserId(null); // Reset userId state
        setIsLoggedIn(false); // Update isLoggedIn state
      })
      .catch((error) => {
        console.error('Logout failed:', error);
      });
  };

  useEffect(() => {
    setUserId(localStorage.getItem('userId'));
  }, [isLoggedIn]);

  return (
    <div className="nav">
      <div className="nav-logo">
       <Link to='/'> Teston Events</Link>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/events">Events</Link>
        {/* <Link to="/add">Add</Link>   */}
        <Link to="/profile">Profile</Link>
        {userId ? <Link to="/" onClick={handleLogout}>Logout</Link> : <Link to="/login">Login</Link>}
      </div>
    </div>
  );
};

export default Nav;
