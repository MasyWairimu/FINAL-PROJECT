import React from 'react'
import { Button, Col, Form, Card, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Signup = () => {
    return (
        <Card style={{ width: '70vw', backgroundColor: '#383232', color: 'white' }} className='mx-auto mt-3 p-3'>
            <Card.Body>
                <Card.Title className='text-center p-2'>REGISTER TO BARATON MAJI</Card.Title>
                <Form >
                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type="text" placeholder="Full Name" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Email@example.com" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>UserName</Form.Label>
                            <Form.Control type="text" placeholder="User Name" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Phone Number</Form.Label>
                            <Form.Control type="tel" placeholder="+2540000000" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Area</Form.Label>
                            <Form.Control type="text" placeholder="Area of Residence" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Plot</Form.Label>
                            <Form.Control type="text" placeholder="Location" />
                        </Form.Group>
                    </Row>

                    <Row className="mb-3">
                        <Form.Group as={Col}>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" />
                        </Form.Group>

                        <Form.Group as={Col}>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" placeholder="Confirm Password" />
                        </Form.Group>
                    </Row>

                    <div className='d-grid d-md-flex justify-content-md-end'>
                        <Button className='btn' type="submit">
                            <Link to="/" className='linkelement' style={{ color: 'whitesmoke', textDecoration: 'none' }}>SUBMIT</Link>
                        </Button>
                    </div>
                </Form>

            </Card.Body>
        </Card>
    )
}

export default Signup