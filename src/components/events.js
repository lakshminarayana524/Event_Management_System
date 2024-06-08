import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './styles/events.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:5000/api/events/allevents')
            .then((res) => {
                if (res.data.msg === "Events Fetched") {
                    setEvents(res.data.events);
                }
            })
            .catch((err) => {
                console.log("Unable to fetch", err);
            });
    }, []);

    const handleEventClick = (eventname) => {
        navigate(`/events/${eventname}`);
    };

    return (
        <div className='event-body'>
            <div className='event-content'>
                <div className="event-container">
                    {events.map(event => (
                        <div className='event-card' key={event._id} onClick={() => handleEventClick(event.EventName)}>
                            <img className='event-image' src={event.EventImage} alt='Event' />
                            <div className='event-details'>
                                <h3 className='event-name'>{event.EventName}</h3>
                                <p className='event-date'>{event.EventDate}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
