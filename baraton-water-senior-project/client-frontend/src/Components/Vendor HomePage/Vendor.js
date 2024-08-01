import React, { useEffect, useState } from 'react';
import { Table, Form, Spinner, Alert } from 'react-bootstrap';
import VendorLayout from '../../Layout/VendorLayout'
import axios from 'axios';

const Vendor = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDeliveries = async () => {
            const vendorId = localStorage.getItem('isAdmin'); // Retrieve vendor ID
            if (!vendorId) {
                setError('Vendor not logged in');
                setLoading(false);
                return;
            }

            try {
                const res = await axios.get('http://localhost:8000/api/bookings/');
                setDeliveries(res.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch deliveries');
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, []);

    const handleStatusChange = async (id, status) => {
        try {
            await axios.put('http://localhost:8000/api/bookings/', { status });
            setDeliveries(deliveries.map(delivery => 
                delivery._id === id ? { ...delivery, status } : delivery
            ));
        } catch (err) {
            console.error('Failed to update delivery status', err);
        }
    };

    return (
        <VendorLayout>
            <div>
                <h1 style={{color: 'white', textAlign: 'center'}} className='mt-2' > <strong>AVAILABLE DELIVERIES</strong></h1>
                {loading ? (
                    <Spinner animation="border" variant="light" />
                ) : error ? (
                    <Alert variant="danger">{error}</Alert>
                ) : (
                    <Table className='mx-auto mt-5' hover variant="dark" style={{ width: '70vw' }}>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Phone Number</th>
                                <th>Area</th>
                                <th>Plot</th>
                                <th>Amount</th>
                                <th>Delivery Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {deliveries.length > 0 ? (
                                deliveries.map((delivery, index) => (
                                    <tr key={delivery._id}>
                                        <td>{index + 1}</td>
                                        <td>{delivery.userId?.username || 'N/A'}</td>
                                        <td>{delivery.userId?.phoneNumber || 'N/A'}</td>
                                        <td>{delivery.area}</td>
                                        <td>{delivery.plot}</td>
                                        <td>{delivery.amount}</td>
                                        <td>
                                            <Form.Check
                                                aria-label="option 1"
                                                checked={delivery.status === 'delivered'}
                                                onChange={() => handleStatusChange(delivery._id, delivery.status === 'pending' ? 'delivered' : 'pending')}
                                            />
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7">No pending deliveries found.</td>
                                </tr>
                            )}
                        </tbody>
                    </Table>
                )}
            </div>
        </VendorLayout>
    );
};

export default Vendor;