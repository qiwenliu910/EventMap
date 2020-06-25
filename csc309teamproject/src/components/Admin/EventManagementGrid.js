import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import EventEntry from './EventEntry'

class EventManagementGrid extends Component {
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
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {this.props.events.map((event, i) => {
            return (<EventEntry key={i} event={event} />);
          })}
        </tbody>
      </Table>
    );
  }
}

export default EventManagementGrid;
