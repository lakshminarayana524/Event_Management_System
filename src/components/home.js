import React from 'react';
import { useNavigate } from 'react-router-dom';
import './styles/home.css'

const Home = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleEvents = () =>{
    navigate('./events')
  }

  const handleCreate = () =>{
    navigate('./add')
  }

  return (
    <div className='home-body'>
     
      <div className='home-content'>
        <div className='home-header'>
          <h1>Welcome to Teston Events</h1>
          <p>Your one-stop solution for managing and organizing events.</p>
        </div>
        <div className='home-container'>
          <div className='home-card' onClick={handleEvents}>
            <h2>Upcoming Events</h2>
            <p>Check out the upcoming events and join us for an amazing experience.</p>
          </div>
          <div className='home-card' onClick={handleCreate}>
            <h2>Create Event</h2>
            <p>Organize your own events and manage attendees with ease.</p>
          </div>
          <div className='home-card'>
            <h2>Contact Us</h2>
            <p>Get in touch with us for any queries or support.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
