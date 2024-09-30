import React from "react";
import { Link, NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSignIn, 
  faSignOutAlt, 
  faInfoCircle, 
  faUserPlus,
  faStickyNote, 
  faUser,
  faBook,
  faPenNib
} from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/userSlice'; 

const MINKANDA = "Minkanda";
const LOGIN = "Login";
const LOGOUT = "Logout";
const REGISTER = "Register";
const PROFILE = "Profile";
const NOTES = "My Notes";
const PUBLIC_NOTES = "Public Notes";
const ABOUT = "About";

const NavBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated); 

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
        {MINKANDA} <FontAwesomeIcon icon={faPenNib} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ml-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/about">
                  <FontAwesomeIcon icon={faInfoCircle} /> {ABOUT}
                </Nav.Link>
                <Nav.Link as={Link} to="/login"> 
                  <FontAwesomeIcon icon={faSignIn} /> {LOGIN}
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <FontAwesomeIcon icon={faUserPlus} /> {REGISTER}
                </Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/notes">
                  <FontAwesomeIcon icon={faStickyNote} /> {NOTES}
                </Nav.Link>
                <Nav.Link as={Link} to="/notes/public">
                  <FontAwesomeIcon icon={faBook} /> {PUBLIC_NOTES}
                </Nav.Link>
                <Nav.Link as={Link} to="/profile"> 
                  <FontAwesomeIcon icon={faUser} />  {PROFILE}
                </Nav.Link>
                <NavLink className="nav-item nav-link font-weight-bold text-dark" to="/logout"> 
                  <FontAwesomeIcon icon={faSignOutAlt} />  {LOGOUT}
                </NavLink>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
