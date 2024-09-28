import React from "react";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import LogoutButton from "./LogoutButton";
import { selectIsAuthenticated } from '../redux/userSlice'; 

const NOTES_TAKING = "Notes Taking";
const LOGIN = "Login";
const REGISTER = "Register";
const PROFILE = "View Profile";
const NOTES = "My Notes";
const PUBLIC_NOTES = "Public Notes";
const ABOUT = "About";

const NavBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated); 

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          {NOTES_TAKING}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ml-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/about">
                  {ABOUT}
                </Nav.Link>
                <Nav.Link as={Link} to="/login">
                  {LOGIN}
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  {REGISTER}
                </Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/notes">
                  {NOTES}
                </Nav.Link>
                <Nav.Link as={Link} to="/notes/public">
                  {PUBLIC_NOTES}
                </Nav.Link>
                <Nav.Link as={Link} to="/profile">
                  {PROFILE}
                </Nav.Link>
                <Nav.Link>
                  <LogoutButton />
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
