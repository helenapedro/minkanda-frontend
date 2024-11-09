import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as constant from '../utils/constantsUtil';
import * as icon from '@fortawesome/free-solid-svg-icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Navbar from 'react-bootstrap/Navbar';
import { useSelector } from 'react-redux';
import { selectIsAuthenticated } from '../redux/userSlice';

const NavBar = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated); 

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand as={Link} to={isAuthenticated ? "/notes" : "/"}>
          {constant.MINKANDA} <FontAwesomeIcon icon={icon.faPenNib} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ml-auto my-2 my-lg-0" style={{ maxHeight: '100px' }}>
            {!isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/about">
                  <FontAwesomeIcon icon={icon.faInfoCircle} /> {constant.ABOUT}
                </Nav.Link>
                <Nav.Link as={Link} to="/login"> 
                  <FontAwesomeIcon icon={icon.faSignIn} /> {constant.LOGIN}
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <FontAwesomeIcon icon={icon.faUserPlus} /> {constant.REGISTER}
                </Nav.Link>
              </>
            )}
            {isAuthenticated && (
              <>
                <Nav.Link as={Link} to="/notes/add"
                > Add New Note <FontAwesomeIcon icon={icon.faPenNib} /> 
                </Nav.Link>
                <Nav.Link as={Link} to="/notes/public"
                > {constant.PUBLIC_NOTES} <FontAwesomeIcon icon={icon.faBook} />  
                </Nav.Link>
                {/* <NavDropdown title={<span>Notes <FontAwesomeIcon icon={icon.faStickyNote} /></span>} id="navbarScrollingDropdown" >
                  <NavDropdown.Item as={Link} to="/notes">
                  <FontAwesomeIcon icon={icon.faStickyNote} /> {constant.NOTES}
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/notes/public">
                    <FontAwesomeIcon icon={icon.faBook} /> {constant.PUBLIC_NOTES}
                  </NavDropdown.Item>
                </NavDropdown> */}
                <NavDropdown title={<span>Settings <FontAwesomeIcon icon={icon.faCog} /></span>} id="navbarScrollingDropdown" >
                  <NavDropdown.Item as={Link} to="/profile">
                    <FontAwesomeIcon icon={icon.faUser} /> {constant.PROFILE}
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/logout">
                    <FontAwesomeIcon icon={icon.faSignOutAlt} /> {constant.LOGOUT}
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
