import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventEntryAction extends Component {

  render() {
    return (
      <>
        <Link>[Edit]</Link>
        {'   '}
        <Link>[Remove]</Link>
      </>
    );
  }
}

export default EventEntryAction;
