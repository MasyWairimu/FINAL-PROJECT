import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { FaFaucetDrip } from "react-icons/fa6";

const NavbarComponent = () => {
    return (

        <div>
            <Navbar style={{ backgroundColor: "#383232" }}>
                {/* <Navbar  bg='dark' data-bs-theme="dark"> */}
                <Container>
                    <Navbar.Brand style={{ color: "#1ab5e4" }} href="#home">
                        BARATON MAJI BOOKING
                        <FaFaucetDrip />
                    </Navbar.Brand>
                    <Nav>
                        <Nav.Link style={{ color: "white" }} href="/home">Home</Nav.Link>
                        <Nav.Link style={{ color: "white" }} href="/past-bookings">Past Bookings</Nav.Link>
                        <Nav.Link style={{ color: "white" }} href="/contactUs">Contact us</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent