import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import pfp from "../../images/pfp.png"
import "./Layout.css"
import { Route, BrowserRouter, Link } from 'react-router-dom';


class AccountBar extends Component {
  render() {
    const name = this.props.currentUser.username ;
    return (
        <h1 className="AccountBar">
          <img src={pfp} id= "accountPFP"/>
          <p className="name">{ name }
          </p>
          <Dropdown className="dropdown">
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              More
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/account/info">Account Info</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </h1>
    );
  }
}

export default AccountBar;
