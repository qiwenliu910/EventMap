import React, { Component } from 'react';
import './Login.css'

import { Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom';

class LoginInput extends Component {
  state = {
    username: '',
    password: ''
  }

  onChangeUsername = (e) => this.setState({ username: e.target.value });
  onChangePassword = (e) => this.setState({ password: e.target.value });

  onSubmit = (e) => {
    e.preventDefault();
    this.props.loginInput([this.state.username, this.state.password])
    this.setState({username: '',password: ''})
  }


  render() {
    return (
              <Form>
                <Form.Group controlId="fldEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value = {this.state.username} onChange={this.onChangeUsername} />
                </Form.Group>
                <Form.Group controlId="fldPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value = {this.state.password} onChange={this.onChangePassword} />
                  <Form.Text className="text-muted">
                    <Link to="/resetpassword">Forgot password</Link>
                  </Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.onSubmit}>
                  Sign in
                </Button>
              </Form>
    );
  }
}


export default LoginInput;
