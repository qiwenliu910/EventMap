import React from 'react';
import { Route } from 'react-router-dom';
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import Sidebar from "./SettingsSidebar"


import "./AccountPage.css"
class AccountSettings extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayNameVal: "",
      displayNameWarning:"",
      deleteAccountAlert:false,
      currentPassword: "",
      newPassword: "",
      repeatNewPassword: "",
      message:""
    }
  }

  onDisplayNameChange = (e) =>{
    this.setState({ displayNameVal: e.target.value });
  }

  onCurrentPasswordChange = (e) =>{
    this.setState({ currentPassword: e.target.value });
  }

  onNewPasswordChange = (e) =>{
    this.setState({ newPassword: e.target.value });
  }

  onRepeatNewPasswordChange = (e) =>{
    this.setState({ repeatNewPassword: e.target.value });
  }

  onChangePasswordSubmit = (e) => {
    e.preventDefault();
    if (this.state.currentPassword === "") {
      this.setState({ message: "The current password cannot be empty" });
      return;
    }
    if (this.state.newPassword === "") {
      this.setState({ message: "The new password cannot be empty" });
      return;
    }
    if (this.state.repeatNewPassword !== this.state.newPassword) {
      this.setState({ message: "The new password and repeat new password must match" });
      return;
    }
    let updatedUser = {};
    updatedUser.password = this.state.newPassword;
    updatedUser.currentPassword = this.state.currentPassword;
    this.props.actions.updateUser(updatedUser, this.props.state.currentUser._id).then(result => {
      if (result.success === true) {
        this.setState({ 
          message: "Your password has been updated",
          currentPassword: "",
          newPassword: "",
          repeatNewPassword: "",
        });
      }
      else {
        this.setState({ message: "Failed updating your password" });
      }
    });
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
    let updatedUser = {};
    updatedUser.displayName = this.state.displayNameVal
    // [*] Exchanging data with external source
    this.props.actions.updateUser(updatedUser, this.props.state.currentUser._id).then((ret) => {
      if (ret.success === true) {
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
    // const selectEvent = (eventNum) =>{
    //     console.log(eventNum)
    //     this.setState({currentEvent: eventNum})
    //   }
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
                    <h3>Change password</h3>
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
                      <Form.Group controlId="fldCurrentPassword">
                        <Form.Label>Current Password</Form.Label>
                        <Form.Control type="password" placeholder="Current Password" value={this.state.currentPassword} onChange={this.onCurrentPasswordChange} />
                      </Form.Group>
                      <Form.Group controlId="fldNewPassword">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control type="password" placeholder="New Password" value={this.state.newPassword} onChange={this.onNewPasswordChange} />
                      </Form.Group>
                      <Form.Group controlId="fldRepeatNewPassword">
                        <Form.Label>Repeat New Password</Form.Label>
                        <Form.Control type="password" placeholder="Repeat New Password" value={this.state.repeatNewPassword} onChange={this.onRepeatNewPasswordChange} />
                      </Form.Group>
                      <Button variant="primary" type="submit" onClick={this.onChangePasswordSubmit}>
                        Change password
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
