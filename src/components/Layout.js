import { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Link, Outlet } from 'react-router-dom';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function Layout({ children }) {
  return (
    <Fragment>
      <Helmet titleTemplate="Tonality - %s" />
      <Navbar expand="lg" variant="dark">
        <Container>
          <Navbar.Brand>
            <Nav.Link as={Link} to="/">
              <FontAwesomeIcon fixedWidth icon={faMusic} size="lg" /> tonality
            </Nav.Link>
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav></Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Container>
        <Outlet />
        {children}
      </Container>
    </Fragment>
  );
}

Layout.propTypes = {
  children: PropTypes.node
};
