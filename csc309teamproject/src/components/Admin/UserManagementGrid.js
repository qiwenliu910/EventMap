import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import UserEntry from './UserEntry'

class UserManagementGrid extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.users.map((user, i) => {
            return (<UserEntry key={i} user={user} />);
          })}
        </tbody>
      </Table>
    );
  }
}

export default UserManagementGrid;
