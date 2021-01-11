import React, { SyntheticEvent, useState  } from 'react';
import {Navbar, Nav, NavDropdown, Button} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


export const NavigationPreLogin: React.FunctionComponent<any> = (props) => {

  return(

<Navbar style={{position:"absolute" , top:"0", width:"100%", height:"2.2em"}} collapseOnSelect expand="lg" bg="dark" variant="dark">
  <Navbar.Brand href="#home">Super Duper Awesome Books</Navbar.Brand>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
  <Navbar.Collapse id="responsive-navbar-nav">
   
    <div style={{position:"absolute" , right:"0",}}> 
    <Button variant="outline-secondary" size="lg">
      Sign in
    </Button>{' '}
    <Button variant="outline-secondary" size="lg">
      Register
    </Button>

    </div>
  </Navbar.Collapse>
</Navbar>
  )
}