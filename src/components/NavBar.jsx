import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faSignIn, faSignOutAlt, 
  faInfoCircle, faUserPlus, 
  faStickyNote, faUser, 
  faBook, faPenNib
} from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/userSlice';
import { MINKANDA, ABOUT, LOGIN, LOGOUT, REGISTER, PROFILE, NOTES, PUBLIC_NOTES } from "../utils/constantsUtil"; 

const NavBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated); 

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to={isAuthenticated ? "/notes" : "/"}>
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
                <Nav.Link as={Link} to="/notes/add"
                > 
                  Create New Note
                  <FontAwesomeIcon icon={faPenNib} /> 
                </Nav.Link>
                <NavDropdown title={<span>Notes <FontAwesomeIcon icon={faStickyNote} /></span>} id="navbarScrollingDropdown" >
                  <NavDropdown.Item as={Link} to="/notes">
                  <FontAwesomeIcon icon={faStickyNote} /> {NOTES}
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/notes/public">
                    <FontAwesomeIcon icon={faBook} /> {PUBLIC_NOTES}
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title={<span>User <FontAwesomeIcon icon={faUser} /></span>} id="navbarScrollingDropdown" >
                  <NavDropdown.Item as={Link} to="/profile">
                    <FontAwesomeIcon icon={faUser} /> {PROFILE}
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/logout">
                    <FontAwesomeIcon icon={faSignOutAlt} /> {LOGOUT}
                  </NavDropdown.Item>
                </NavDropdown>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
