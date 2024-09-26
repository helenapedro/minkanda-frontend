import React, { useState, useEffect } from "react";
//import { loginUser, authUser } from "../services/auth";
import { Link } from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

const NOTES_TAKING = "Notes Taking";
const LOGIN = "Login";
const REGISTER = "Register";

const NavBar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false); 
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        {isAuthenticated ? (
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/profile" className="nav-link">Profile</Link>
            </li>
            <li className="nav-item">
              <button className="btn btn-link" onClick={handleLogout}>Logout</button>
            </li>
          </ul>
        ) : (
          <>
            <Navbar.Brand as={Link} to="/">{NOTES_TAKING}</Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ml-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
                <Nav.Link as={Link} to="/login">{LOGIN}</Nav.Link>
                <Nav.Link as={Link} to="/register">{REGISTER}</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
};

export default NavBar;
