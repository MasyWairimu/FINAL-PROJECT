import React, { useEffect, useState } from 'react'
import { Card, Button } from 'react-bootstrap'
import Layout from '../../Layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Checkout = () => {
    const [booking, setBooking] = useState(null);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBooking = async () => {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('User not logged in');
                return;
            }

            try {
                const res = await axios.get('http://localhost:8000/api/bookings/');
                const bookings = res.data;
                setBooking(bookings[bookings.length - 1]);
            } catch (err) {
                setError(err.response?.data?.message || 'failed to fetch booking data')
            }
        };
        fetchBooking();
    }, [navigate]);

    const totalPrice = (amount) => {
        return amount * 20;
    };

    if (error) return <p style={{ color: 'red' }}>{error}</p>;

    return (
        <Layout>
            <div className='d-flex justify-content-center align-items-center'>
                <Card style={{ width: '70vw', backgroundColor: '#383232', color: 'white' }} className='mx-auto mt-3 p-3'>
                    <Card.Body>
                        <Card.Title className='text-center p-2'>CHECKOUT</Card.Title>
                        {booking ? (
                        <div>
                            <p><strong>Area:</strong> {booking.area}</p>
                            <p><strong>Plot:</strong> {booking.plot}</p>
                            <p><strong>No. of Jericans:</strong> {booking.amount}</p>
                            <p><strong>Total Price:</strong> Ksh. {totalPrice(booking.amount)}</p>
                        </div>
                    ) : (
                        <p>Loading...</p>
                    )}
                    <div className='d-grid d-md-flex justify-content-md-end m-2'>
                        <Button className='btn' onClick={() => navigate('/booking')} style={{ color: 'whitesmoke', textDecoration: 'none' }}>Back to Booking</Button>
                    </div>

                    </Card.Body>
                </Card>
            </div>
        </Layout>

    )
}

export default Checkout