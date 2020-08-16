import React, { Component } from 'react';
import './Login.css'

import { Form, Button, Alert } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';

class LoginInput extends Component {
  state = {
    email: '',
    password: '',
    redirect: false,
    invalid: false,
    message: ""
  }

  onChangeEmail = (e) => this.setState({ email: e.target.value });
  onChangePassword = (e) => this.setState({ password: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();

    if (this.state.email.trim() === '' || this.state.password.trim() === '') {
      this.setState({invalid: true, message: "Please enter an email and password"});
      return;
    }
    // [*] Exchanging data with external source
    this.props.actions.authenticateUser(this.state.email, this.state.password).then((success) => {
      if (success === true) {
        this.setState({ email: '', password: '', redirect: true, invalid: false });
      }
      else {
        this.setState({ email: '', password: '', redirect: false, invalid: true, message: "Invalid email or password. Please try again." });
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
            <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} />
          </Form.Group>
          <Form.Group controlId="fldPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} />
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
