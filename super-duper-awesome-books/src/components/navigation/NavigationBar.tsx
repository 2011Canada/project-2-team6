import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Link } from "react-router-dom";
import { User } from '../Model/User';

export const NavigationBar: React.FunctionComponent<any> = (props) => {
  return (
    <div style={{ width: "100%", top: "0", position: 'relative' }}>
      <Navbar style={{ height: "100%" }} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="../home">Super Duper Awesome Books</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">

          <div style={{ position: "absolute", right: "0", }}>
            <Link to={`/search-page`} style={{ paddingRight: '5px' }}>
              <Button href="/login" variant="outline-secondary" size="lg">Go To Search Page</Button>
            </Link>
            <Button href="/login" variant="outline-secondary" size="lg">
              Sign in
          </Button>{' '}
            <Button href="/register" variant="outline-secondary" size="lg">
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
    <div style={{ width: "100%", top: "0", position: 'relative' }}>
      <Navbar style={{ height: "2.2em" }} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">Super Duper Awesome Books</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">

          <div style={{ position: "absolute", right: "0", }}>
              <Button href="/myprofile/:userid" variant="outline-secondary" size="lg" style={{marginRight:'10px'}}>
                profile
            </Button>
            <Button variant="outline-secondary" size="lg" style={{marginRight:'10px'}}>
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

  console.log(props.currentUser)
  console.log("diplay Here")
  return (
    (props.currentUser) ?
      <NavigationPostLogin />
      :
      <NavigationBar />
  )
}

export default DisplayNav
