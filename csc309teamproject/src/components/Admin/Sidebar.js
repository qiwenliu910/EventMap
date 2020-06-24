import React from 'react';
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';


class Sidebar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/admin/dashboard">Dashboard</Nav.Link>
        <Nav.Link as={Link} to="/admin/events">Manage Events</Nav.Link>
        <Nav.Link as={Link} to="/admin/users">Manage Users</Nav.Link>
      </Nav>
    );
  }

}


export default Sidebar;
