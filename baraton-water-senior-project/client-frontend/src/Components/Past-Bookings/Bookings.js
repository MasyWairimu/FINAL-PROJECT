import React, { useEffect, useState } from 'react';
import { Card, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PastBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            const userId = localStorage.getItem('userId'); // Retrieve the user ID
            if (!userId) {
                setError('User not logged in');
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get('http://localhost:8000/api/bookings/');
                setBookings(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch bookings');
            } finally {
                setLoading(false);
            }
        };

        fetchBookings();
    }, [navigate]);

    return (
        <div className='d-flex justify-content-center align-items-center'>
            <Card style={{ width: '70vw', backgroundColor: '#383232', color: 'white' }} className='mx-auto mt-3 p-3'>
                <Card.Body>
                    <Card.Title className='text-center p-2'>Past Bookings</Card.Title>
                    {loading ? (
                        <Spinner animation="border" variant="light" />
                    ) : error ? (
                        <Alert variant="danger">{error}</Alert>
                    ) : (
                        <ListGroup>
                            {bookings.length > 0 ? (
                                bookings.map((booking) => (
                                    <ListGroup.Item key={booking._id} style={{ backgroundColor: '#444', color: 'white' }}>
                                        <p><strong>Area:</strong> {booking.area}</p>
                                        <p><strong>Plot:</strong> {booking.plot}</p>
                                        <p><strong>No. of Jericans:</strong> {booking.amount}</p>
                                        <p><strong>Total Price:</strong> {booking.amount * 20} sh</p>
                                    </ListGroup.Item>
                                ))
                            ) : (
                                <p>No past bookings found.</p>
                            )}
                        </ListGroup>
                    )}
                    <div className='d-grid d-md-flex justify-content-md-end m-2'>
                        <Button className='btn' onClick={() => navigate('/booking')} style={{ color: 'whitesmoke', textDecoration: 'none' }}>Back to Booking</Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};

export default PastBookings;