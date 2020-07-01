import React, { Component } from 'react';
import AccountBar from './AccountBar';
import "./Layout.css"
import { Nav, Navbar, Button } from 'react-bootstrap'
import { Route, BrowserRouter, Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Header extends Component {

  render() {
    const isLoggedIn = (this.props.currentUser.id !== -1);

    return (
      <header>
        <Navbar bg="dark" variant="dark">
          <Navbar.Brand as={Link} to="/">Project</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link as={Link} to="/">Home</Nav.Link>
            <Nav.Link as={Link} to="/about">About</Nav.Link>
            <Nav.Link as={Link} to="/events">Quick View</Nav.Link>
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
