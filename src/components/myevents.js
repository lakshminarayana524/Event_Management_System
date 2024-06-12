import React,{useState,useEffect} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Load from './load';
import './styles/events.css';

const Myevents = () => {
  const [events, setEvents] = useState([]);
    const navigate = useNavigate();
    const [load, setLoad] = useState(false);
    const userId = localStorage.getItem('userId')

    useEffect(() => {
        setLoad(true);

        // axios.get(`http://localhost:5000/api/events/allevent/${userId}`)
        axios.get(`https://event-management-system-od1t.onrender.com/api/events/allevent/${userId}`)

            .then((res) => {
                if (res.data.msg === "Events Fetched") {
                  // const filtered = res.data.events.filter()
                    setEvents(res.data.events);
                    setLoad(false);
                }
            })
            .catch((err) => {
                setLoad(false);
                console.log("Unable to fetch", err);
            });
    }, [userId]);

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


export default Myevents
