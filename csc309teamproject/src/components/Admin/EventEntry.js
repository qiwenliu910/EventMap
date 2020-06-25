import React, { Component } from 'react';
import EventEntryAction from './EventEntryAction'

class EventEntry extends Component {

  render() {
    const eventId = this.props.event.CRIME_ID;
    const eventName = this.props.event.TITLE;
    const eventUser = this.props.event.ARTHOR;
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
