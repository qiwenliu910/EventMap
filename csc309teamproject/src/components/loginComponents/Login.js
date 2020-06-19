import React, { Component } from 'react';
import LoginInput from "./LoginInput"
import PropTypes from 'prop-types';
import './Login.css'

class Login extends Component {
  checkValidLogin = ([username, password]) =>{
    console.log(username)
    console.log(password)
    const user = this.props.users.filter(
      (e) => e.username === username && e.password === password)
    console.log(user)
    if(user.length !== 0){
      this.props.setCurrentUser(user[0])
    }
  }

  render() {
    return (
      <div className="Main">
        <h1> Sign In </h1>
        <LoginInput loginInput={this.checkValidLogin}/>
      </div>
    );
  }
}

// PropTypes
Login.propTypes = {
  users: PropTypes.array.isRequired
}

export default Login;
