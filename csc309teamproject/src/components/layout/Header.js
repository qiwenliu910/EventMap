import React from 'react';
import Account from './Account';
import "./Layout.css"
import { Nav, Navbar, Button } from 'react-bootstrap'
import { Route, BrowserRouter, Link } from 'react-router-dom';
function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand as={Link} to="/">Project</Navbar.Brand>
        <Nav className="mr-auto">
          <Nav.Link as={Link} to="/">Home</Nav.Link>
          <Nav.Link as={Link} to="/about">About</Nav.Link>
        </Nav>
      <Route exact path='/' render={() => (
        <Nav>
          <Button as={Link} to="/login" variant="dark" className="mr-sm-2">Sign in</Button>
          <Button as={Link} to="/createaccount" variant="outline-light">Sign up</Button>
        </Nav>
      )}/>
      <Route exact path='/account' render={() => (<Account />)}/>
      </Navbar>
    </header>
  )
}

export default Header
