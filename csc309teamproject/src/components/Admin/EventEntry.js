import React, { Component } from 'react';
import EventEntryAction from './EventEntryAction'

class EventEntry extends Component {

  render() {
    const eventId = 1;
    const eventName = "Test Event";
    const eventUser = "Doge";
    return (
      <tr>
        <td>{eventId}</td>
        <td>{eventName}</td>
        <td>{eventUser}</td>
        <td><EventEntryAction /></td>
      </tr>
    );
  }
}

export default EventEntry;
