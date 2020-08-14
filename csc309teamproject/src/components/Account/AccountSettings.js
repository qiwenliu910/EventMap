import React, { useState } from 'react';
import { Route, Switch, BrowserRouter } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import Sidebar from "./SettingsSidebar"
import SettingsPFP from "./SettingsPFP"
// import pfp from "../../images/pfp.png"
// import pfp2 from "../../images/pfp2.png"
// import pfp3 from "../../images/pfp3.png"

import "./AccountPage.css"
class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // profilePictures : [pfp,pfp2,pfp3],
      displayNameVal: "",
      displayNameWarning:"",
      deleteAccountAlert:false,
      message:""
    }
  }

  onDisplayNameChange = (e) =>{
    this.setState({ displayNameVal: e.target.value });
  }

  onDisplayNameSubmit = (e) => {
    e.preventDefault();
    // frontend validation
    let valid = true;
    if (this.state.displayNameVal.trim() === "") {
      this.setState({ displayNameWarning: "Please enter a display name." });
      valid = false;
    }
    if (valid === false)
      return;
    let updatedUser = this.props.state.currentUser
    updatedUser.displayName = this.state.displayNameVal
    // [*] Exchanging data with external source
    this.props.actions.updateUser(updatedUser).then((ret) => {
      console.log(ret)
      if (ret === true) {
        this.setState({ message: "Your account has been successfully updated." });
      }
      else {
        this.setState({ message: ret.message });
      }
    });
  }
  onDeleteAccountClick = (e) =>{
    this.setState({ deleteAccountAlert: true });
  }
  onDeleteAccountNo = (e) =>{
    this.setState({ deleteAccountAlert: false });
  }
  onDeactivateAccountSubmit = (e) => {
    e.preventDefault();
    this.props.state.currentUser.events.map((event)=> {
      this.props.actions.deleteEvent(event)

    })
    this.props.state.currentUser.upvote.map((event)=> {
      this.props.actions.changeVote(event._id, 0, this.props.state.currentUser, null)

    })
    this.props.state.currentUser.downvote.map((event)=> {
      this.props.actions.changeVote(event._id, 1, this.props.state.currentUser, null)

    })
    this.props.actions.deleteUser(this.props.state.currentUser._id)
    console.log(this.props)
    console.log(this.state)
  }
  render() {
    const selectEvent = (eventNum) =>{
        console.log(eventNum)
        this.setState({currentEvent: eventNum})
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
                  {
                    this.state.message !== '' ?
                      <>
                        <Row>
                          <Alert className="wide" variant='warning'>{this.state.message}</Alert>
                        </Row>
                      </>
                      :
                      null
                  }
                  <Form>
                    <Form.Group controlId="fldUsername">
                      <Form.Control type="username" placeholder="Enter Display Name" value={this.state.displayNameVal} onChange={this.onDisplayNameChange} disabled={false}/>
                      {
                        this.state.displayNameWarning !== "" ?
                          <Form.Text className="text-danger">{this.state.displayNameWarning}</Form.Text>
                          :
                          null
                      }
                    </Form.Group>
                    <Button variant="primary" type="submit" onClick={this.onDisplayNameSubmit}>
                      Change Display Name
                    </Button>
                  </Form>
                </Col>
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
                    <Button variant="primary" type="submit"onClick={this.onDeleteAccountClick}>
                      Deactivate Account
                    </Button>
                  </Col>
                </Row>
                {
                  this.state.deleteAccountAlert ?
                    <>
                      <Row>
                        <h2>This action will delete all user info (including the user's events)</h2>
                        <h3>Are you sure?</h3>
                        <Button variant="danger" type="submit" onClick={this.onDeactivateAccountSubmit}>
                          YES
                        </Button>
                        <Button variant="primary" type="submit" onClick={this.onDeleteAccountNo}>
                          NO
                        </Button>
                      </Row>
                    </>
                    :
                    null
                }
              </main>
            </Container>
          )}/>
        </div>
      </div>
    );
  }
}


export default AccountSettings;
