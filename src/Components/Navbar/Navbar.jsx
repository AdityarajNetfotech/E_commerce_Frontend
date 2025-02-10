import React from 'react'
import logo from "../Images/Group.png"
import { Navbar, Nav, Container, Dropdown } from "react-bootstrap";
import schoolOutline from "../Images/teenyicons_school-outline.png"
import cartIcon from "../Images/icons_cart.png"
import accoutIcon from "../Images/Layer 6.png"
import "../Navbar/Navbar.css"

function CustomNavbar() {
  return (
    

    <Navbar expand="lg" className=" customixe-Height shadow-sm p-3 bg-warning ">
      <Container className=' customHeight'>
      <div className='custom-brand'>
        <Navbar.Brand href="#" className=" d-flex align-items-center">
          <img src={logo} alt="logo" className="custom-img" />
          <span className="fw-bold customStyle">Brand<span className="text-primary customStyle">Name</span></span>
        </Navbar.Brand>
        </div>
       
        <Navbar.Text className=" d-flex justify-content-center align-items-center mx-auto fw-bold text-dark">
          <img className="schoolImg text-dark custom-school" src={schoolOutline} alt="schoolOutline" />
          <div className='customize-hw custom-school'>
            <i className="me-2"></i>
            Gurukul High School, Ahemdabad
          </div>
        </Navbar.Text>
       
        
        <Nav className="ms-auto">
        <div className="ms-auto custom-display custom-largeDisplay"> 
          <Nav.Link href="#" className="me-3">
            <button>
              <img src={cartIcon} alt="cartIcon" size={22} className="text-dark custom-icon" />
            </button>
          </Nav.Link>
         
          <Dropdown>
            <Dropdown.Toggle bsPrefix="toggle" className="border-0 bg-transparent">
              <button>
                <img src={accoutIcon} alt="accountIcon" size={24} className="text-dark custom-icon" />
              </button>
            </Dropdown.Toggle>
            <Dropdown.Menu align="end">
              <Dropdown.Header className="fw-bold">Welcome Sam!!</Dropdown.Header>
              <Dropdown.Item href="#">My Orders</Dropdown.Item>
              <Dropdown.Item href="#">Customer Care</Dropdown.Item>
              <Dropdown.Item href="#">Account Details</Dropdown.Item>
              <Dropdown.Item href="#" className="text-danger">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </div>
        </Nav>
        
      </Container>
    </Navbar>



  )
}

export default CustomNavbar


