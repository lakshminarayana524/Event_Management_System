import React, { useRef } from 'react';
import QRCode from 'qrcode.react';
import html2canvas from 'html2canvas';
import './styles/ticket.css';

const Ticket = ({ eventDetails, userDetails, members, paymentId }) => {
    const qrData = `PaymentId: ${paymentId}, UserId: ${userDetails.id}, EventId: ${eventDetails.id}`;
    const ticketRef = useRef(null);

    const handleDownload = () => {
        if (ticketRef.current) {
            html2canvas(ticketRef.current, { scale: 2 }).then(canvas => {
                const link = document.createElement('a');
                link.download = `${eventDetails.EventName}_ticket.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }
    };

    return (
        <div>
            <div ref={ticketRef} className="ticket" style={{ backgroundImage: `url(${eventDetails.EventImage})` }}>
                <div className="ticket-content">
                    <h2>{eventDetails.EventName}</h2>
                    <p>Date: {eventDetails.EventDate}</p>
                    <p>Time: {eventDetails.EventTime}</p>
                    <p>Location: {eventDetails.EventLocation}</p>
                    <p>User: {userDetails.name}</p>
                    <p>Email: {userDetails.email}</p>
                    <p>Number of Members: {members}</p>
                    <p>Payment ID: {paymentId}</p>
                    <QRCode value={qrData} />
                </div>
            </div>
            <button className="download-button" onClick={handleDownload}>Download Ticket</button>
        </div>
    );
};

export default Ticket;
