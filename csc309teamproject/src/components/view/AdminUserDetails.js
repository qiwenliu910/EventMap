import React from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import Sidebar from '../Admin/Sidebar'

import { Form, Button, Alert } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';


class AdminUserDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayName: "",
      email: "",
      password: "",
      admin: false,
      userObj: null,
      message: "",
      userDeleted: false
    };
  }

  componentDidMount() {
    this.loadUser(this.props.userId);
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  onChangeAdmin = (e) => {
    this.setState({ admin: e.target.checked === true });
  }
  onChangeDisplayName = (e) => {
    this.setState({ displayName: e.target.value });
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }
  onSave = (e) => {
    e.preventDefault();
    let user = {
      displayName: this.state.displayName,
      admin: this.state.admin
    };
    if (this.state.password !== '') {
      user.password = this.state.password
    }
    // [*] Exchanging data with external source
    this.props.actions.updateUser(user, this.props.userId).then(result => {
      if (result.success) {
        this.setState({ message: "This user has been updated successfully" });
      }
      else {
        this.setState({ message: "Failed updating user" });
      }
    });
  }

  onDelete = (e) => {
    e.preventDefault();
    // [*] Exchanging data with external source
    this.props.actions.deleteUser(this.props.userId).then((success) => {
      if (success) {
        this.setState({ userDeleted: true });
      }
      else {
        this.setState({ message: "Failed deleting user" });
      }
    });
  }

  loadUser(userId) {
    this.props.actions.getUser(userId).then((user) => {
  
      if (user !== null) {
        this.setState({
          displayName: user.displayName,
          email: user.email,
          password: "",
          admin: user.admin,
          userObj: user
        });
      }
      else {
        this.setState({
          message: "Fails loading user details"
        });
      }
    });
  }

  render() {
    if (this.state.userDeleted)
      return <Redirect push to="/admin/users" />;
    return (
      <Container>
        <main>
          <Row>
            <Col md={2}>
              <Sidebar />
            </Col>
            <Col md={10}>

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


              <Row><h3>Edit User</h3></Row>
              <Row>
                <Form>
                <Form.Group controlId="fldEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control type="email" placeholder="Enter user email" value={this.state.email} onChange={this.onChangeEmail} />
                      </Col>
                      <Col>
                        <Form.Check
                          type="checkbox"
                          id="autoSizingCheck"
                          className="mb-2"
                          label="Admin"
                          checked={this.state.admin}
                          onChange={this.onChangeAdmin}
                        />
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group controlId="fldDisplayName">
                    <Form.Label>Display Name</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control type="text" placeholder="Enter user display name" value={this.state.displayName} onChange={this.onChangeDisplayName} />
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  
                  <Form.Group controlId="fldPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control type="password" placeholder="Enter password" value={this.state.password} onChange={this.onChangePassword} />
                        <Form.Text className="text-muted">Leave this blank if you do not want to change password</Form.Text>
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Row>
                    <Col><Button variant="primary" type="submit" onClick={this.onDelete}>Delete</Button></Col>
                    <Col className="right"><Button variant="primary" type="submit" onClick={this.onSave}>Save</Button></Col>
                  </Form.Row>


                </Form>
              </Row>


            </Col>
          </Row>
        </main>
      </Container>
    );
  }

}


export default AdminUserDetails;
