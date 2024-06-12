import React, { useEffect, useState } from 'react';
import './styles/eventsdet.css';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import Load from './load';

const EventDetails = () => {
    const userId = localStorage.getItem('userId');
    const { eventId, eventname } = useParams();
    const [eventDetails, setEventDetails] = useState({});
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    axios.defaults.withCredentials=true

    useEffect(() => {
        setLoading(true);
        axios.get(`https://event-management-system-od1t.onrender.com/api/events/eventdet/${eventId}`)
        // axios.get(`http://localhost:5000/api/events/eventdet/${eventId}`)

            .then((res) => {
                if (res.data.msg === "Event Details Fetched") {
                    setEventDetails(res.data.eventdet);
                    setLoading(false);
                }
            })
            .catch((err) => {
                setLoading(false);
                console.error("Unable to fetch the event details", err);
            });
    }, [eventId]);

    if (loading) {
        return <Load />;
    }

    const handleBook = (eventId) => {
        navigate(`/book/${eventId}`);
    };

    return (
        <div className='event-details-body'>
            <div className='event-details-content'>
                <div className='event-details-container' style={{ backgroundImage: `url(${eventDetails.EventImage})` }}>
                    <div className='event-info'>
                        <h2>{eventDetails.EventName}</h2>
                        <p>Date: {eventDetails.EventDate} &#x2022; {eventDetails.EventTime}</p>
                        <p>Location: {eventDetails.EventLocation}</p>
                    </div>
                    <div className='event-book'>
                        <button onClick={() => handleBook(eventDetails._id)}>Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetails;
