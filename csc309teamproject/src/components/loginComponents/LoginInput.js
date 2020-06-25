import React, { Component } from 'react';
import './Login.css'

import { Form, Button, Row, Alert } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';

class LoginInput extends Component {
  state = {
    username: '',
    password: '',
    redirect: false,
    invalid: false,
    message: ""
  }

  onChangeUsername = (e) => this.setState({ username: e.target.value });
  onChangePassword = (e) => this.setState({ password: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    
    if (this.state.username.trim() === '' || this.state.password.trim() === '') {
      this.setState({invalid: true, message: "Please enter username and password"});
      return;
    }

    this.props.actions.authenticateUser(this.state.username, this.state.password).then((success) => {
      if (success === true) {
        this.setState({ username: '', password: '', redirect: true, invalid: false });
      }
      else {
        this.setState({ username: '', password: '', redirect: false, invalid: true, message: "Invalid username or password. Please try again." });
      }
    });
  }


  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    let message = null;
    if (this.state.invalid) {
      message = <Alert variant='warning'>{this.state.message}</Alert>
    }
    return (
      <>
        {message}
        <Form>
          <Form.Group controlId="fldEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control type="email" placeholder="Enter email" value={this.state.username} onChange={this.onChangeUsername} />
          </Form.Group>
          <Form.Group controlId="fldPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
            <Form.Text className="text-muted">
              <Link to="/resetpassword">Forgot password</Link>
            </Form.Text>
          </Form.Group>
          <Button variant="primary" type="submit" onClick={this.onSubmit}>
            Sign in
                </Button>
        </Form>
      </>
    );
  }
}


export default LoginInput;
