/**
 *
 * Header
 *
 */
import * as React from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface Props {}

export function Header(props: Props) {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="/">
        <Link to={'/'}>HHG Case Study</Link>
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link>
            <Link to={'/counter'}>Counter</Link>
          </Nav.Link>
          <Nav.Link>
            <Link to={'/employees'}>Employees</Link>
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}
