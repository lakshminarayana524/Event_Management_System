import React, { useState,useEffect } from 'react';
import axios from 'axios';
import './styles/addevents.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Load from './load';

const AddEvents = () => {
    const [eventName, setEventName] = useState('');
    const [eventDate, setEventDate] = useState('');
    const [eventTime, setEventTime] = useState('');
    const [eventattendees, seteventattendees] = useState('');
    const [eventLocation, setEventLocation] = useState('');
    const [eventMusicians, setEventMusicians] = useState('');
    const [images, setImages] = useState([]);
    const [imagePreviews, setImagePreviews] = useState([]);
    const [send, setSend] = useState(false);
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();
    const [load,setload]=useState(false);

    axios.defaults.withCredentials = true;

    useEffect(()=>{
        if(!userId){
        navigate('/login');
        }
    },[])

    const onSubmit = (e) => {
        e.preventDefault();
        setload(true);
        const formData = new FormData();
        images.forEach(image => {
            formData.append("image", image);
        });
        formData.append("userId", userId);
        formData.append("eventName", eventName);
        formData.append("eventDate", eventDate);
        formData.append("eventTime", eventTime);
        formData.append("eventAttendees", eventattendees);
        formData.append("eventLocation", eventLocation);
        formData.append("eventMusicians", eventMusicians);
    
        axios.post('http://localhost:5000/api/events/add', formData)
        
            .then(res => {
                if (res.data.msg === "Event Added Successfully") {
                    setSend(true);
                    console.log(res.data.msg);
                    setEventName('');
                    setEventDate('');
                    setEventTime('');
                    seteventattendees('');
                    setEventLocation('');
                    setEventMusicians('');
                    setImages([]);
                    setImagePreviews([]);
                    }
                    console.log(res);
                    setload(false);
            })
            .catch(err => {
                setload(false);
                console.log(err)});

    };
    
    useEffect(() => {
                if (send) {
            toast.success('Event added successfully');
            setSend(false);
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);
        }
    }, [send]);

    if(load){
        return <Load/>
    }


    const handleFileReader = (e) => {
        const files = Array.from(e.target.files);
        setImages(files);

        const previews = files.map(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
            });
        });

        Promise.all(previews).then(previews => {
            setImagePreviews(previews);
        });
    };

   

    return (
        <div className='add-event'>
            <h1>Add a new event</h1>
            {imagePreviews.length > 0 && (
                <div className="image-previews">
                    {imagePreviews.map((preview, index) => (
                        <img key={index} src={preview} alt="Preview" />
                    ))}
                </div>
            )}
            <form onSubmit={onSubmit}>
                <div className="input-container">
                    <input type="text" name="eventName" value={eventName} onChange={e => setEventName(e.target.value)} required />
                    <label htmlFor="eventName" className="label">Event Name</label>
                    <div className="underline"></div>
                </div>
                <div className="input-container">
                    <input type="date" name="eventDate" value={eventDate} onChange={e => setEventDate(e.target.value)} min={getMinDate()} max={getMaxDate()} required />
                    <label htmlFor="eventDate" className="label"></label>
                    <div className="underline"></div>
                </div>
                <div className="input-container">
                    <input type="time" name="eventTime" value={eventTime} onChange={e => setEventTime(e.target.value)} required />
                    <label htmlFor="eventTime" className="label"></label>
                    <div className="underline"></div>
                </div>
                <div className="input-container">
                    <input type="text" name="eventLocation" value={eventLocation} onChange={e => setEventLocation(e.target.value)} required />
                    <label htmlFor="eventLocation" className="label">Event Location</label>
                    <div className="underline"></div>
                </div>
                <div className="input-container">
                    <input type="text" name="eventMusicians" value={eventMusicians} onChange={e => setEventMusicians(e.target.value)} required />
                    <label htmlFor="eventMusicians" className="label">Event Musicians</label>
                    <div className="underline"></div>
                </div>
                <div className="input-container">
                    <input type="number" name="eventAttendees" value={eventattendees} onChange={e => seteventattendees(e.target.value)} required />
                    <label htmlFor="eventMusicians" className="label">Event Attendees</label>
                    <div className="underline"></div>
                </div>
                <div className="input-container">
                    <input type="file" name="images" onChange={handleFileReader} multiple required />
                    <div className="underline"></div>
                </div>
                <button type="submit">Submit</button>
            </form>
            <ToastContainer />
        </div>
    );
};

export default AddEvents;

// Function to get the minimum date allowed for event selection
const getMinDate = () => {
    const currentDate = new Date();
    const minDate = new Date(currentDate.setMonth(currentDate.getMonth() )); // 2 months from current date
    return minDate.toISOString().split('T')[0];
};

// Function to get the maximum date allowed for event selection
const getMaxDate = () => {
    const currentDate = new Date();
    const maxDate = new Date(currentDate.setMonth(currentDate.getMonth() + 3)); // 3 months from current date
    return maxDate.toISOString().split('T')[0];
};

