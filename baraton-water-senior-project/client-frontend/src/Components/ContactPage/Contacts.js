import React from 'react'
import Layout from '../../Layout/Layout'
import { Card, Button } from 'react-bootstrap'
import { FaPhoneAlt, FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Contacts = () => {
    return (
        <Layout>
            <Card style={{ width: '70vw', backgroundColor: '#383232', color: 'white' }} className='mx-auto mt-3 p-3'>
                <Card.Body>
                    <Card.Title>About Us:</Card.Title>
                    <Card.Text>
                        We are Baraton Maji, Here to deliver water at your doorstep in a short time and at an extremely cheap price. Our purpose it to create a
                        streamlined method of ordering water and delivering your order. Fell free to reach out to us and order.
                    </Card.Text>
                </Card.Body>
                <Card.Body>
                    <Card.Title>Reach Us Through:</Card.Title>
                    <Card.Text style={{ display: 'block' }}>
                        <div className='p-1 m-3'> <FaPhoneAlt /> Call us through: 071234567</div>
                        <div className='p-1 m-3'> <FaInstagram /> Follow us on: @BARAMAJISACCO</div>
                    </Card.Text>
                    <Button variant="primary">
                        <Link to="/home" className='linkelement' style={{ color: 'whitesmoke', textDecoration: 'none' }}>HOME</Link>
                    </Button>
                </Card.Body>
            </Card>
        </Layout>
    )
}

export default Contacts