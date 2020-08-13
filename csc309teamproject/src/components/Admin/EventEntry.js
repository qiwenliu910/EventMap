import React, { Component } from 'react';
import EventEntryAction from './EventEntryAction'

class EventEntry extends Component {

  render() {
    const eventId = this.props.event._id;
    const eventName = this.props.event.title;
    const eventUser = this.props.event.author;
    return (
      <tr>
        <td>{eventId}</td>
        <td>{eventName}</td>
        <td>{eventUser}</td>
        <td><EventEntryAction eventId={eventId} /></td>
      </tr>
    );
  }
}

export default EventEntry;
