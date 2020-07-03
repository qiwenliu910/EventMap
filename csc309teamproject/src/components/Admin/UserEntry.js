import React, { Component } from 'react';
import UserEntryAction from './UserEntryAction'

class UserEntry extends Component {

  render() {
    const userId = this.props.user.id;
    const userName = this.props.user.username;
    return (
      <tr>
        <td>{userId}</td>
        <td>{userName}</td>
        <td><UserEntryAction userId={userId} /></td>
      </tr>
    );
  }
}

export default UserEntry;
