import React, { useState } from 'react'
import { Card, Form, Row, Col, Button } from 'react-bootstrap'
import Layout from '../../Layout/Layout'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const Booking = () => {

    const [area, setArea] = useState('');
    const [plot, setPlot] = useState('');
    const [amount, setAmount] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId'); //retrieves user ID
        if (!userId) {
            setError('You are not logged in');
            return;
        }

        try {
            const res = await axios.post('http://localhost:8000/api/bookings',
                { userId, area, plot, amount },
            );
            console.log(res.data);
            navigate('/checkout');

        } catch (err) {
            setError(err.response?.data?.message || 'Something went wrong')
        }
    }

    return (
        <Layout>
            <Card style={{ width: '70vw', backgroundColor: '#383232', color: 'white' }} className='mx-auto mt-3 p-3'>
                <Card.Body>
                    <Card.Title className='text-center p-2'>REGISTER TO BARATON MAJI</Card.Title>
                    <Form onSubmit={handleSubmit} >
                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label>Area</Form.Label>
                                <Form.Control type="text" placeholder="Area of Residence" value={area} onChange={(e) => setArea(e.target.value)} required />
                            </Form.Group>

                            <Form.Group as={Col}>
                                <Form.Label>Plot</Form.Label>
                                <Form.Control type="text" placeholder="Location" value={plot} onChange={(e) => setPlot(e.target.value)} required />
                            </Form.Group>
                        </Row>

                        <Row className="mb-3">
                            <Form.Group as={Col}>
                                <Form.Label> No. of Jericans</Form.Label>
                                <Row>
                                    <Form.Select aria-label="Quantity" className='m-1 w-75'>
                                        <option>Choose...</option>
                                        <option value="2">Jericans</option>
                                    </Form.Select>
                                    <Form.Control className='m-1 w-75' type="text" placeholder="No. of Jericans" value={amount} onChange={(e) => setAmount(e.target.value)} required />
                                </Row>

                            </Form.Group>
                        </Row>
                        {error && <p style={{ color: 'red' }}>{error}</p>}
                        <div className='d-grid d-md-flex justify-content-md-end m-2'>
                            <Button className='btn' type="submit" style={{ color: 'whitesmoke', textDecoration: 'none' }}>SUBMIT</Button>
                        </div>
                    </Form>

                </Card.Body>
            </Card>
        </Layout>
    )
}

export default Booking