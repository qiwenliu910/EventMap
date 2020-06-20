import React, { Component } from 'react';
import Dropdown from 'react-bootstrap/Dropdown'
import pfp from "../../images/pfp.png"
import "./Layout.css"
import { Route, BrowserRouter, Link } from 'react-router-dom';


class AccountBar extends Component {
  render() {
    const name = this.props.currentUser[0].username ;
    return (
        <h1 className="AccountBar">
          <img src={pfp} id= "accountPFP"/>
          <p1>{ name }
          </p1>
          <p2>
          <Dropdown>
            <Dropdown.Toggle variant="success" id="dropdown-basic">
              More
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item as={Link} to="/account/info">Account Info</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          </p2>
        </h1>
    );
  }
}

export default AccountBar;
