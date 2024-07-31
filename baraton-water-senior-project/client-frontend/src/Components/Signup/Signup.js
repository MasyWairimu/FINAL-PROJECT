import React, { useState } from 'react'
import { Button, Col, Form, Card, Row, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const Signup = () => {

    const [userData, setuserData] = useState({
        username: '',
        email: '',
        phoneNumber: '',
        location: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const {username, email, phoneNumber, location, password, confirmPassword} = userData;
    
    const onChange = e => setuserData({...userData, [e.target.name]: e.target.value});

    const onSubmit = async (e) => {
        e.preventDefault();

        if(password !== confirmPassword) {
            alert("Passwords do not match!");
            <Alert>Passwords do not match</Alert>
            return;
        }

        try {
            const res = await axios.post('http://localhost:8000/api/authentication/register',
                userData,
                {withCredentials: true}
            )
            console.log(res.data);

            navigate('/')
        }catch (err){
            setError(err.response?.data?.message || 'something went wrong!' )
        }
    }


    return (
        <Card style={{ width: '70vw', backgroundColor: '#383232', color: 'white' }} className='mx-auto mt-3 p-3'>
            <Card.Body>
                <Card.Title className='text-center p-2'>REGISTER TO BARATON MAJI</Card.Title>
                <Form onSubmit={onSubmit}>
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" name="username" value={username} onChange={onChange} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email@example.com" name="email" value={email} onChange={onChange}  />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">

                        <Form.Group as={Col}>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" placeholder="+2540000000" name="phoneNumber" value={phoneNumber} onChange={onChange} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Location</Form.Label>
                            <Form.Control type="text" placeholder="Area of Residence" name="location" value={location} onChange={onChange} />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={onChange} />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" name="confirmPassword" value={confirmPassword} onChange={onChange} />
                        </Form.Group>
                    </Row>
                    {error && <p style={{color:'red'}} >{error}</p>}

                    <div className='d-grid d-md-flex justify-content-md-end'>
                        <Button className='btn w-25' type="submit">
                            SUBMIT
                        </Button>
                    </div>
                </Form>

            </Card.Body>
        </Card>
    )
}

export default Signup;