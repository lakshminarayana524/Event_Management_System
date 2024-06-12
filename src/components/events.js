import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Load from './load';
import './styles/events.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);

    useEffect(() => {
        setLoad(true);

        axios.get('http://localhost:5000/api/events/allevents')
            .then((res) => {
                if (res.data.msg === "Events Fetched") {
                    setEvents(res.data.events);
                    setLoad(false);
                }
            })
            .catch((err) => {
                setLoad(false);
                console.log("Unable to fetch", err);
            });
    }, []);

    const handleEventClick = (eventname, eventId) => {
        navigate(`/events/${eventId}/${eventname}`);
    };

    if (load) {
        return <Load />;
    }

    return (
        <div className='event-body'>
            <div className='event-content'>
                <div className="event-container">
                    {events.map(event => (
                        <div className='event-card' key={event._id} onClick={() => handleEventClick(event.EventName, event._id)}>
                            <div className='event-background' style={{ backgroundImage: `url(${event.EventImage})` }}>
                                <div className='event-details'>
                                    <h3 className='event-name'>{event.EventName}</h3>
                                    <p className='event-date'>{event.EventDate} &#x2022; {event.EventTime}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Events;
