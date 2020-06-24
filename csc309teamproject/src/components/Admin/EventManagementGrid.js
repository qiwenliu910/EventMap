import React, { Component } from 'react';
import { Table } from 'react-bootstrap'
import EventEntry from './EventEntry'

class EventManagementGrid extends Component {

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
          <EventEntry />
          <EventEntry />
        </tbody>
      </Table>
    );
  }
}

export default EventManagementGrid;
