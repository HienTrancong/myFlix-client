import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';


export function NavbarView({ user }) {

  const onLoggedOut = () => {
    localStorage.clear();
    window.open("/", "_self");
  }

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }
    if (localStorage.getItem("token")) {
      return localStorage.getItem("token");
    } else {
      return false;
    }
  };

  return (
    <Navbar bg="light" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="/">MyFlix</Navbar.Brand>
        <Nav className="me-auto">
          {(<Nav.Link href="/register">Sign-up</Nav.Link>)}
          {isAuth() && (<Nav.Link href="/">Sign-in</Nav.Link>)}
          {isAuth() && (<Nav.Link as={Link} to={`/users/${user}`}> Profile</Nav.Link>)}
          {isAuth() && (<Button onClick={() => { onLoggedOut() }}>Log-out</Button>)}
        </Nav>
      </Container>
    </Navbar>
  );
}
