import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Load from './load';
import QRModal from './payment';
import Ticket from './ticket';
import './styles/book.css';

const Book = () => {
    const { eventId } = useParams();
    const [eventDetails, setEventDetails] = useState(null);
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [members, setMembers] = useState(1);
    const [showQRModal, setShowQRModal] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState('');
    const [paymentId, setPaymentId] = useState(null); // State to store payment ID
    const userId = localStorage.getItem('userId');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchEventDetails = async () => {
            setLoading(true);
            try {
                const response = await axios.get(`https://event-management-system-od1t.onrender.com/api/events/event/${eventId}`);
                // const response = await axios.get(`http://localhost:5000/api/events/event/${eventId}`);

                if (response.data.msg === "Event Details Fetched") {
                    setEventDetails(response.data.event);
                }
            } catch (error) {
                console.error("Unable to fetch the event details", error);
            } finally {
                setLoading(false);
            }
        };

        const fetchUserDetails = async () => {
            if (userId) {
                setLoading(true);
                try {
                    const response = await axios.get(`https://event-management-system-od1t.onrender.com/api/user/user/${userId}`);
                    // const response = await axios.get(`http://localhost:5000/api/user/user/${userId}`);

                    if (response.data.msg === "Profile data fetched") {
                        setUserDetails(response.data.pro);
                    }
                } catch (error) {
                    console.error("Unable to fetch the user details", error);
                } finally {
                    setLoading(false);
                }
            }
        };

        fetchEventDetails();
        fetchUserDetails();
    }, [eventId, userId]);

    const handleBooking = () => {
        setShowQRModal(true);
        setPaymentStatus('');
        setPaymentId(`PAY-${new Date().getTime()}`); // Generate a mock payment ID
    };

    const handleCloseQRModal = () => {
        setShowQRModal(false);
        setPaymentStatus('Payment Failed');
    };

    const handlePaymentSuccess = () => {
        setShowQRModal(false);
        setPaymentStatus('Payment Successful');
    };

    useEffect(()=>{
        const ticket = async() =>{
            try{
                // const  res = await axios.post(`http://localhost:5000/api/events/ticket`)
                const res = await axios.post(`https://event-management-system-od1t.onrender.com/api/events/ticket`)
            }
            catch(err){
                console.log(err);

            }
        }
        ticket();
    },[paymentId])

    if (loading) {
        return <Load />;
    }

    if (!userId) {
        return <div className="evt">Please <span className="splan" onClick={() => navigate('/login')}>Login</span></div>;
    }

    if (!eventDetails) {
        return <div>Something went wrong</div>;
    }

    const totalPrice = eventDetails.EventPrice * members;

    

    return (
        <div className='book-body'>
            <div className='body-content'>
                <div className='body-container'>
                    <h2>Booking for {eventDetails.EventName}</h2>
                    <img src={eventDetails.EventImage} alt={eventDetails.EventName} />
                    <p>{eventDetails.EventDate} &#x2022; {eventDetails.EventTime}</p>
                    <p> {eventDetails.EventLocation}</p>
                    <p>Price per Entry: {eventDetails.EventPrice ? eventDetails.EventPrice : 'Free'}</p>
                    <div className="members-selection">
                        <label htmlFor="members">Number of Members:</label>
                        <select 
                            id="members" 
                            value={members} 
                            onChange={(e) => setMembers(Number(e.target.value))}
                        >
                            {[...Array(6).keys()].map((num) => (
                                <option key={num + 1} value={num + 1}>
                                    {num + 1}
                                </option>
                            ))}
                        </select>
                    </div>
                    <p>Total Price: ${eventDetails.EventPrice ? totalPrice : "Free"}</p>
                    {userDetails && (
                        <div className="user-details">
                            <h3>User Details:</h3>
                            <p>Name: {userDetails.name}</p>
                            <p>Email: {userDetails.email}</p>
                        </div>
                    )}
                    <button className="book-button" onClick={handleBooking}>
                        Book Now
                    </button>
                </div>
            </div>
            {showQRModal && <QRModal eventId={eventId} userId={userId} onClose={handleCloseQRModal} onPaymentSuccess={handlePaymentSuccess} />}
            {paymentStatus === 'Payment Successful' && 
                <Ticket 
                    eventDetails={eventDetails} 
                    userDetails={userDetails} 
                    members={members} 
                    paymentId={paymentId} 
                />}
            {paymentStatus && <div className={`payment-status ${paymentStatus === 'Payment Successful' ? 'success' : 'failure'}`}>{paymentStatus}</div>}
        </div>
    );
};

export default Book;
