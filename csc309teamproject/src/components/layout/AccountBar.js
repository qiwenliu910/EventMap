import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import pfp from "../../images/pfp.png"
import "./Layout.css"
import {Link } from 'react-router-dom';


class AccountBar extends Component {
  onLogout = () => {
    this.props.actions.logout();
  }
  render() {
    const name = this.props.currentUser.displayName;
    return (
      <h1 className="AccountBar">
        <img src={pfp} id="accountPFP" />
        <p className="name">{name}
        </p>
        <Dropdown alignRight className="dropdown">
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            More
            </Dropdown.Toggle>
          <Dropdown.Menu>
            <Dropdown.Item as={Link} to="/account/info">Account Info</Dropdown.Item>
            {
              this.props.currentUser.admin === true ?
                <>
                  <Dropdown.Divider />
                  <Dropdown.Item as={Link} to="/admin/dashboard">Admin Portal</Dropdown.Item>
                  <Dropdown.Divider />
                </>
                :
                null
            }
            <Dropdown.Item as={Link} to="/account/events">My Events</Dropdown.Item>
            <Dropdown.Item as={Link} to="/account/eventcreate">Create An Event</Dropdown.Item>
            <Dropdown.Item as={Link} to="/account/settings">Profile Settings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item as={Link} to="/" onClick={this.onLogout}>Sign out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </h1>
    );
  }
}

export default AccountBar;
