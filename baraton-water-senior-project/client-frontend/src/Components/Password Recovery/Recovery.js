import React from 'react'
import {Card, Form, Row, Col, Button} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Recovery = () => {
  return (
    <div >
            <Card className='mx-auto mt-5' style={{ width: '45vw', backgroundColor: '#383232', color: 'white' }}>
                <Card.Body>
                    <Card.Title className='text-center p-2'>RECOVER YOUR EMAIL</Card.Title>
                    <Form>
                        <Form.Group className="mb-3 p-1" controlId="formBasicEmail">
                            <Row>
                                <Col>
                                    <Form.Label>Email address</Form.Label>
                                </Col>
                                <Col className='col-8'>
                                    <Form.Control type="email" placeholder="Enter email" />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3 p-1" controlId="formBasicPassword">
                            <Row>
                                <Col>
                                    <Form.Label>Password</Form.Label>
                                </Col>
                                <Col className='col-8'>
                                    <Form.Control type="password" placeholder="Password" />
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3 p-1" controlId="formBasicPassword">
                            <Row>
                                <Col>
                                    <Form.Label>Confirm Password</Form.Label>
                                </Col>
                                <Col className='col-8'>
                                    <Form.Control type="password" placeholder="Confirm Password" />
                                </Col>
                            </Row>
                        </Form.Group>
                        <div className='d-grid d-md-flex justify-content-md-end'>
                            <Button className='btn' type="submit">
                                <Link to="/" className='linkelement' style={{ color: 'whitesmoke', textDecoration: 'none' }}>SUBMIT</Link>
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
  )
}

export default Recovery