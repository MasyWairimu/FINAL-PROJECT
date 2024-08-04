import React, { useEffect, useState } from 'react';
import { Table, Spinner, Alert, Tabs, Tab, Button } from 'react-bootstrap';
import VendorLayout from '../../Layout/VendorLayout'
import axios from 'axios';

const Vendor = () => {
    const [deliveries, setDeliveries] = useState([]);
    const [myOrders, setMyOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const userId = localStorage.getItem('userId'); // Retrieve vendor ID

    useEffect(() => {
        const fetchDeliveries = async () => {
            if (!userId) {
                setError('Vendor not logged in');
                setLoading(false);
                return;
            }

            try {
                const [deliveriesRes, myOrdersRes] = await Promise.all([
                    axios.get('http://localhost:8000/api/bookings/'),
                    axios.get('http://localhost:8000/api/bookings/vendor/' + userId)

                ]);
                setDeliveries(deliveriesRes.data);
                setMyOrders(myOrdersRes.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch deliveries');
            } finally {
                setLoading(false);
            }
        };

        fetchDeliveries();
    }, [userId]);

    const handleStatusChange = async (id, status) => {
        const userId = localStorage.getItem('userId')
        try {
            await axios.put('http://localhost:8000/api/bookings/'+id+'/grab', { userId });
            setDeliveries(deliveries.filter(delivery => delivery._id !== id));
            const grabbedDelivery = deliveries.find(delivery => delivery.id === id);
            setMyOrders([...myOrders, { ...grabbedDelivery, status: 'grabbed', vendor: userId }]);
        } catch (err) {
            console.error('Failed to update delivery status', err);
        }
    };

    return (
        <VendorLayout>
            <div>
                <h1 style={{ color: 'white', textAlign: 'center' }} className='mt-2'> <strong>Vendor Dashboard</strong></h1>
                <Tabs defaultActiveKey="available" id="vendor-tabs" className="mb-3">
                    <Tab eventKey="available" title="Available Deliveries" style={{textDecoration: 'none'}}>
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
                                        <th>Action</th>
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
                                                    <Button variant="success" onClick={() => handleStatusChange(delivery._id)}>
                                                        Grab
                                                    </Button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7">No available deliveries found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        )}
                    </Tab>
                    <Tab eventKey="orders" title="My Orders" style={{textDecoration: 'none'}}>
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
                                    {myOrders.length > 0 ? (
                                        myOrders.map((order, index) => (
                                            <tr key={order._id}>
                                                <td>{index + 1}</td>
                                                <td>{order.userId?.username || 'N/A'}</td>
                                                <td>{order.userId?.phoneNumber || 'N/A'}</td>
                                                <td>{order.area}</td>
                                                <td>{order.plot}</td>
                                                <td>{order.amount}</td>
                                                <td>
                                                    {order.status}
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="7">No orders found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </Table>
                        )}
                    </Tab>
                </Tabs>
            </div>
        </VendorLayout>
    );
};

export default Vendor;