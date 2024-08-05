import React from 'react'
import { Container, Navbar } from 'react-bootstrap'
import { FaFaucetDrip } from "react-icons/fa6";

const NavbarComponent = () => {
    return (

        <div>
            <Navbar  style={{backgroundColor: "#383232"}}>
            {/* <Navbar  bg='dark' data-bs-theme="dark"> */}
                <Container>
                    <Navbar.Brand style={{color:"#1ab5e4"}} href="#home">
                        BARATON MAJI BOOKING
                        <FaFaucetDrip />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    )
}

export default NavbarComponent