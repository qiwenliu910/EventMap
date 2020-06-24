import React from 'react';
import { Container } from 'react-bootstrap'
import AccountPage from '../Account/AccountPage'
class Account extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <AccountPage state={this.props.state}/>
    );
  }
}


export default Account;
