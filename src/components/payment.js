import React, { useEffect } from 'react';
import QRCode from 'qrcode.react';
import './styles/payment.css';

const QRModal = ({ eventId, userId, onClose, onPaymentSuccess }) => {
    const qrData = `EventId: ${eventId}, UserId: ${userId}`;

    useEffect(() => {
        const timer = setTimeout(() => {
            onPaymentSuccess();
        }, 5000);

        return () => clearTimeout(timer);
    }, [onPaymentSuccess]);

    return (
        <div className="qr-modal">
            <div className="qr-modal-content">
                <span className="qr-modal-close" onClick={onClose}>&times;</span>
                <h2>Scan this QR code for your booking</h2>
                <QRCode value={qrData} />
            </div>
        </div>
    );
};

export default QRModal;
