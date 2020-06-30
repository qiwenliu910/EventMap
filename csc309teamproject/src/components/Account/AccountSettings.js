import React, { useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import Sidebar from "./SettingsSidebar"
import SettingsPFP from "./SettingsPFP"
import pfp from "../../images/pfp.png"
import pfp2 from "../../images/pfp2.png"
import pfp3 from "../../images/pfp3.png"

import "./AccountPage.css"
class AccountSettings extends React.Component {
  state = {
    profilePictures : [pfp,pfp2,pfp3]
  }


  render() {
    const selectEvent = (eventNum) =>{
        console.log(eventNum)
        this.setState({currentEvent: eventNum, profilePictures : [pfp,pfp2,pfp3]})
      }

    return (
      <div id="settings">
        <h1 className="settingsTitle">Settings</h1>
        <div className="sidebar">
          <Sidebar />
        </div>
        <div id="settingsBody">
          <Route exact path='/account/settings/resetpass' render={() =>(
            <Container>
              <main>
                <Row>
                  <Col md={{ span: 6, offset: 0 }}>
                    <h3>Forgot password</h3>
                    <hr></hr>
                    <Form>
                      <Form.Group controlId="fldEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" />
                      </Form.Group>
                      <Button variant="primary" type="submit">
                        Reset password
                      </Button>
                    </Form>
                  </Col>
                </Row>
              </main>
            </Container>
          )}/>
          <Route exact path='/account/settings/profile' render={() =>(
            <Container>
            <main>
              <Row>
                <Col md={{ span: 6, offset: 0 }}>
                  <h3>Change Display Name</h3>
                  <hr></hr>
                  <Form>
                    <Form.Group controlId="fldUsername">
                      <Form.Label>Username</Form.Label>
                      <Form.Control type="username" placeholder="Enter Display Name" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                      Change Display Name
                    </Button>
                  </Form>
                </Col>
              </Row>
              <Row>
                <h3>Change Profile Picture</h3>
              </Row>
              <Row>
                  {this.state.profilePictures.map((pfp) => (
                    <SettingsPFP pfp={pfp}/>
                  ))}
              </Row>
            </main>
            </Container>
          )}/>
          <Route exact path='/account/settings/deactivate' render={() =>(
            <Container>
              <main>
                <Row>
                  <Col md={{ span: 6, offset: 0 }}>
                    <h3>Deactivate Account</h3>
                    <hr></hr>
                    <Button variant="primary" type="submit">
                      Deactivate Account
                    </Button>
                  </Col>
                </Row>
              </main>
            </Container>
          )}/>
        </div>
      </div>
    );
  }
}


export default AccountSettings;
