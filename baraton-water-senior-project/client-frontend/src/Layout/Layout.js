import React from 'react'
import NavbarComponent from '../Components/Navbar/CustomerNavbar'

function Layout({children}) {
  return (
    <div>
        <NavbarComponent/>
        <div>{children}</div>
    </div>
  )
}

export default Layout