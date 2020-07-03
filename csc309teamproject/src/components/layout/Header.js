import React, { Component } from 'react';
import AccountBar from './AccountBar';
import "./Layout.css"
import { Nav, Navbar, Button, NavDropdown } from 'react-bootstrap'
import { Route, BrowserRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends Component {

  sendData = (data) => {
    this.props.callbackFromParent(data);
  }

  render() {
    const isLoggedIn = (this.props.currentUser.id !== -1);

  let filter = <NavDropdown className="headerDropdown" title="Filter" id="basic-nav-dropdown" >
  <NavDropdown.Item  as="button" value='Disease' onClick={() => this.sendData(0)} >Disease</NavDropdown.Item>
  <NavDropdown.Item  as="button" value='Robbery' onClick={() => this.sendData(1)} >Robbery</NavDropdown.Item>
  <NavDropdown.Item  as="button" value='Fire' onClick={() => this.sendData(2)} >Fire</NavDropdown.Item>
  <NavDropdown.Item  as="button" value='Assualt' onClick={() => this.sendData(3)} >Assualt</NavDropdown.Item>
  <NavDropdown.Item  as="button" value='Clear' onClick={() => this.sendData(null)} >Clear</NavDropdown.Item>
</NavDropdown>

    return (
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">Project</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/events">Quick View</Nav.Link>
            {filter}
          </Nav>
          {isLoggedIn
            ?
            <AccountBar currentUser={this.props.currentUser} actions={this.props.actions} />
            :
            <Nav>
              <Button as={Link} to="/login" variant="dark" className="mr-sm-2">Sign in</Button>
              <Button as={Link} to="/createaccount" variant="outline-light">Sign up</Button>
            </Nav>
          }
        </Navbar>
      </header>
    );
  }
}
// function Header(user) {
//   const [currentUser, setCurrentUser] = useState(user)
//   if(currentUser.username === "default"){
//     return (
//       <header>
//         <Navbar bg="dark" variant="dark">
//         <Navbar.Brand as={Link} to="/">Project</Navbar.Brand>
//         <Nav className="mr-auto">
//           <Nav.Link as={Link} to="/">Home</Nav.Link>
//           <Nav.Link as={Link} to="/about">About</Nav.Link>
//         </Nav>
//         <Nav>
//           <Button as={Link} to="/login" variant="dark" className="mr-sm-2">Sign in</Button>
//           <Button as={Link} to="/createaccount" variant="outline-light">Sign up</Button>
//         </Nav>
//         </Navbar>
//       </header>
//     )
//   }
//     else{
//       return (
//       <header>
//       <Navbar bg="dark" variant="dark">
//         <Navbar.Brand as={Link} to="/">Project</Navbar.Brand>
//         <Nav className="mr-auto">
//           <Nav.Link as={Link} to="/">Home</Nav.Link>
//           <Nav.Link as={Link} to="/about">About</Nav.Link>
//         </Nav>
//         <Account />
//         </Navbar>
//       </header>
//     )
//   }
// }

export default Header
