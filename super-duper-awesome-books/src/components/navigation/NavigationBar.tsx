import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from '../Model/User';

export const NavigationBar: React.FunctionComponent<any> = (props) => {
  return (
    <div style={{ width: "100%"}}>
      <Navbar style={{ height: "100%" }} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="../home">Super Duper Awesome Books</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">

          <div style={{ position: "absolute", right: "0", }}>

            <Button href="/search-page" variant="outline-secondary" size="lg" style={{ marginRight: '10px' }}>Go To Search Page</Button>
            <Button href="/login" variant="outline-secondary" size="lg" style={{ marginRight: '10px' }}>
              Sign in
          </Button>
            <Button href="/register" variant="outline-secondary" size="lg" style={{ marginRight: '10px' }}>
              Register
          </Button>
          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export const NavigationPostLogin: React.FunctionComponent<any> = (props) => {

  return (
    <div style={{ width: "100%"}}>
      <Navbar style={{ height: "100%" }} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="../home">Super Duper Awesome Books</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">

          <div style={{ position: "absolute", right: "0", }}>
            <Button href="/search-page" variant="outline-secondary" size="lg" style={{ marginRight: '10px' }}>Go To Search Page</Button>

            <Button href="/myprofile/:userid" variant="outline-secondary" size="lg" style={{ marginRight: '10px' }}>
              profile
            </Button>
            <Button variant="outline-secondary" size="lg" style={{ marginRight: '10px' }}>
              Sign out
          </Button>

          </div>

        </Navbar.Collapse>

      </Navbar>

    </div>


  )
}

interface ILoginProps {
  currentUser: User
}

export const DisplayNav: React.FunctionComponent<ILoginProps> = (props) => {

  // console.log(props.currentUser)

  return (
    (props.currentUser) ?
      <NavigationPostLogin />
      :
      <NavigationBar />
  )
}

export default DisplayNav
