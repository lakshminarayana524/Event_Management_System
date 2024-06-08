import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dash = () => {
  const navigate =useNavigate();

  const handleEvent=()=>{
    navigate('/events')
  }

  return (
    <div className="dash-body">
      <div className="dash-content">
        <h1>Welcome to Dashboard</h1>
        <p>Manage your events and profile from here.</p>
        <div className="dash-container">
          <div className="dash-card" onClick={handleEvent}>
            <h2>Your Events</h2>
            <p>View and manage your events.</p>
          </div>
          <div className="dash-card">
            <h2>Attendees</h2>
            <p>Check the list of attendees for your events.</p>
          </div>
          <div className="dash-card">
            <h2>Settings</h2>
            <p>Adjust your profile and account settings.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dash;
