import React from 'react';
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';


class SettingsSidebar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/account/settings/profile">Customize Profile</Nav.Link>
        <Nav.Link as={Link} to="/account/settings/resetpass">Reset Password</Nav.Link>
        <Nav.Link as={Link} to="/account/settings/deactivate">Deactivate Account</Nav.Link>
      </Nav>
    );
  }

}


export default SettingsSidebar;
