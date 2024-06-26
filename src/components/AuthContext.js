// src/components/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [username, setUsername] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    const token = Cookies.get('token');
    if (token) {
      setIsLoggedIn(true);
    }
    if (storedUserId) {
      setUserId(storedUserId);
    }

    axios.get('https://event-management-system-od1t.onrender.com/api/verify')
    // axios.get('http://localhost:5000/api/verify')


      .then(res => {
        if (res.data.userId) {
          setUserId(res.data.userId);
          localStorage.setItem('userId', res.data.userId);
        } else {
          localStorage.removeItem('userId');
        }
      })
      .catch(err => {
        console.error("Error verifying token:", err);
        localStorage.removeItem('userId');
      });
  }, []);

  useEffect(() => {
    if (userId) {
      axios.get(`https://event-management-system-od1t.onrender.com/api/user/user-details/${userId}`)
      // axios.get(`http://localhost:5000/api/user/user-details/${userId}`)

        .then(response => {
          setUsername(response.data.username);
        })
        .catch(error => {
          console.error("Error retrieving username:", error);
        });
    }
  }, [userId]);

  return (
    <AuthContext.Provider value={{ userId, setUserId, username, isLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};
