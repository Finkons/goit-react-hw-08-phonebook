import Logout from 'components/Logout';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import authSelectors from 'redux/auth/auth-selectors';

const NavBar = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <header>
      <Navbar
        className="flipInX"
        style={{ paddingTop: '0.3rem', paddingBottom: '0.3rem' }}
        fixed="top"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand as={NavLink} to={'/'}>
            Contacts
          </Navbar.Brand>

          {isLoggedIn ? (
            <Logout />
          ) : (
            <Nav>
              <Nav.Link as={NavLink} to={'/LogIn'}>
                LogIn
              </Nav.Link>
              <Nav.Link as={NavLink} to={'/SignUp'}>
                SignUp
              </Nav.Link>
            </Nav>
          )}
        </Container>
      </Navbar>
    </header>
  );
};

export default NavBar;
