import React, { useEffect, useState } from 'react';
import { Card, Button, Form, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';

const Checkout = ({ bookingId }) => {
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deliveryStatus, setDeliveryStatus] = useState('');

  console.log("The bookingId is: ", bookingId);


  useEffect(() => {

    console.log("bookingId: ", bookingId);

    const fetchBookingDetails = async () => {
        console.log("Check out details for bookingId:" + bookingId)
      if (bookingId) {
        setLoading(true);
        setError(''); // Reset error before fetching
        try {
          console.log('Fetching booking details for ID:', bookingId);
          const response = await axios.get(`http://localhost:8000/api/bookings/${bookingId}`);
          console.log('Booking response:', response.data); // Log the response data
          setBooking(response.data);
          setDeliveryStatus(response.data.status);
        } catch (err) {
          console.log('Error fetching booking details:', err);
          setError(err.response?.data?.message || 'Failed to fetch booking details');
        } finally {
          setLoading(false);
        }
      }
    };

    fetchBookingDetails();
  }, [bookingId]);

  const handleMarkAsDelivered = async () => {
    try {
      await axios.put(`http://localhost:8000/api/bookings/${bookingId}/grab`, {
        status: 'delivered',
      });
      setDeliveryStatus('delivered');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update delivery status');
    }
  };

  return (
    <Card>
      <Card.Header as="h5">Booking Details</Card.Header>
      <Card.Body>
        {loading ? (
          <Spinner animation="border" variant="primary" />
        ) : error ? (
          <Alert variant="danger">{error}</Alert>
        ) : booking ? (
          <div>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" value={booking.userId?.username || 'N/A'} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" value={booking.userId?.phoneNumber || 'N/A'} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Area</Form.Label>
              <Form.Control type="text" value={booking.area || 'N/A'} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Plot</Form.Label>
              <Form.Control type="text" value={booking.plot || 'N/A'} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" value={booking.amount || 'N/A'} readOnly />
            </Form.Group>
            <Form.Group>
              <Form.Label>Delivery Status</Form.Label>
              <Form.Control type="text" value={deliveryStatus || 'N/A'} readOnly />
            </Form.Group>
          </div>
        ) : (
          <p>No booking details available.</p>
        )}
      </Card.Body>
      <Card.Footer>
        {deliveryStatus !== 'delivered' && (
          <Button variant="primary" onClick={handleMarkAsDelivered}>
            Mark as Delivered
          </Button>
        )}
        <Button variant="secondary" onClick={() => window.history.back()}>
          Close
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Checkout;
