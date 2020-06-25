import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventEntryAction extends Component {

  render() {
    return (
      <>
        <Link to={'/admin/event/' + this.props.eventId}>[Edit]</Link>
        {'   '}
        <a>[Remove]</a>
      </>
    );
  }
}

export default EventEntryAction;
