import React, {useState} from 'react'
import { Card, Button, Form, Row, Col } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const res = await axios.post('http://localhost:8000/api/authentication/login',
                 {email, password},
                 {withCredentials: true}
                );
                
            console.log(res.data);

            localStorage.setItem('userId', res.data._id);
            localStorage.setItem('isAdmin', res.data.isAdmin);
            console.log('Stored isAdmin', res.data.isAdmin)

            if ( res.data.isAdmin === true) {
                navigate('/vendorhome');
            } else {
                navigate('/home');
            }
        } catch(err){
            setError(err.response?.data?.message || 'Something went wrong');
        }
    }


    return (
        <div >
            <Card className='mx-auto mt-5' style={{ width: '45vw', backgroundColor: '#383232', color: 'white' }}>
                <Card.Body>
                    <Card.Title className='text-center p-2'>WELCOME, LOGIN HERE</Card.Title>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3 p-1" controlId="formBasicEmail">
                            <Row>
                                <Col>
                                    <Form.Label>Email address</Form.Label>
                                </Col>
                                <Col className='col-8'>
                                    <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}  required/>
                                </Col>
                            </Row>
                        </Form.Group>

                        <Form.Group className="mb-3 p-1" controlId="formBasicPassword">
                            <Row>
                                <Col>
                                    <Form.Label>Password</Form.Label>
                                </Col>
                                <Col className='col-8'>
                                    <Form.Control type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                                </Col>
                            </Row>
                        </Form.Group>
                        {error && <p style={{color:'red'}} >{error}</p>}
                        <div className='d-grid d-md-flex justify-content-md-end'>
                            <Button className='btn w-25' type="submit">
                                LOGIN
                            </Button>
                        </div>
                        <div className='text-center m-2'>
                            <span className='link signup-link'>
                                <Link to="/recovery" style={{ color: 'whitesmoke', textDecoration: 'none', textAlign: 'center' }} className='link-opacity-50-hover link-underline-opacity-25'>Forgot Password</Link>
                            </span>
                            
                        </div>
                        <div className='text-center m-1'>
                            <span className='link '>
                                <Link to="/signup" style={{ color: 'whitesmoke', textDecoration: 'none' }} className='link-opacity-50-hover text-sm-center'>Don't have an account? Sign Up</Link>
                            </span>
                        </div>

                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Login