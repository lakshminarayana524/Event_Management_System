import React, { useEffect, useState } from 'react';
import './styles/eventsdet.css'
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Event_details = () => {
    const userId = localStorage.getItem('userId')
    console.log(userId)
    const [eventdet, seteventdet] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/api/events/eventdet/${userId}`)
            .then((res) => {
                if (res.data.msg === "Event Details Fetched") {
                    seteventdet(res.data.eventdet);
                    console.log("Event fetched");
                }
            })
            .catch((err) => {
                console.log("Unable to fetch the event details", err);
            });


    }, [userId]);

    return (
        <div className='eventd-body'>
            <div className='eventd-content'>
                <div className='eventd-container'>
                    <div className='eventd-details'>
                        <div className='eventd-image'>
                            <img src={eventdet.EventImage} alt={eventdet.EventName} />
                        </div>
                        <div className='eventd-eventname'>
                            <h2>{eventdet.EventName}</h2>
                            <p>{eventdet.EventDate}</p>
                            <p>{eventdet.EventLocation}</p>
                        </div>
                    </div>
                    <div className='eventd-book'>
                        <button>Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Event_details;
