import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch, useParams, Link } from "react-router-dom";

export const NavigationBar: React.FunctionComponent<any> = (props) => {
  const loggedInUser = localStorage.getItem('user')
  const loggedInUsername = localStorage.getItem('username')


  const handleLogout = () => {
    localStorage.clear();
  }

  return (
    <div style={{ top: "0", position: 'relative' }}>
      <Navbar style={{ height: "100%" }} collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="../home">Super Duper Awesome Books</Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">

          <div style={{ marginLeft: '18%', right: "0" }}>
            <Link to={`/myprofile`} style={{ paddingRight: '5px' }}>
              <Button variant="outline-secondary" size="lg">{`${loggedInUsername}'s Profile`}</Button>
            </Link>
            <Link to={`/club-registration`} style={{ paddingRight: '5px' }}>
              <Button variant="outline-secondary" size="lg">Make a Club!</Button>
            </Link>
            <Link to={`/search-clubs`} style={{ paddingRight: '5px' }}>
              <Button variant="outline-secondary" size="lg">Search Clubs!</Button>
            </Link>
            <Link to={`/search-page`} style={{ paddingRight: '5px' }}>
              <Button variant="outline-secondary" size="lg">Search Books!</Button>
            </Link>
            <Link to={`/login`} style={{ paddingRight: '5px' }}>
              <Button variant="outline-secondary" size="lg" >
                Sign Out!
                                </Button>
            </Link>

          </div>
        </Navbar.Collapse>
      </Navbar>
    </div>
  )
}

export default NavigationBar