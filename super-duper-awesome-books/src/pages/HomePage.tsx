import React from 'react';
import { Navbar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

import banner from '../pictures/banner.png';
import SearchPage from './SearchPage';
import Footer from '../components/footer/Footer';
import { BrowserRouter as Router, Route, Switch, useParams, Link } from "react-router-dom";

export const HomePage: React.FunctionComponent<any> = (props) => {

    return (
        <div>

            <div style={{ width: "100%", position: 'relative' }}>
                <Navbar style={{ height: "100%" }} collapseOnSelect expand="lg" bg="dark" variant="dark">


                    <Navbar.Brand href="./home">Super Duper Awesome Books</Navbar.Brand>

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
                <img style={{ width: "100%" }} src={banner} alt="Logo" />

            </div>


            <Footer />
        </div>
    )
}

export default HomePage;