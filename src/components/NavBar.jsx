import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NOTES_TAKING = "Notes Taking";
const LOGIN = "Login";
const REGISTER = "Register";
const LOGOUT = "Logout";

const NavBar = () => {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          {NOTES_TAKING}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ml-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
            <Nav.Link as={Link} to="/login">
              {LOGIN}
            </Nav.Link>
            <Nav.Link as={Link} to="/register">
              {REGISTER}
            </Nav.Link>
            <Nav.Link as={Link} to="/logout">
              {LOGOUT}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
