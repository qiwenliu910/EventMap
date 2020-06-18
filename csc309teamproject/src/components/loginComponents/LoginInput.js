import React, { Component } from 'react';
import './Login.css'

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
      <div>
        <h3> Username </h3>
        <form>
          <input
            type="text"
            name="username"
            style={{ flex: '', padding: '5px'}}
            placeholder="Username"
            value = {this.state.username}
            onChange={this.onChangeUsername}
          />
        </form>
        <h3> Password </h3>
        <form >
          <input
            type="text"
            name="password"
            style={{ flex: '', padding: '5px'}}
            placeholder="Password"
            value = {this.state.password}
            onChange={this.onChangePassword}
          />
        </form>
        <input
          type="submit"
          value="Login"
          className="loginBtn"
          onClick={this.onSubmit}
        />
      </div>
    );
  }
}


export default LoginInput;
