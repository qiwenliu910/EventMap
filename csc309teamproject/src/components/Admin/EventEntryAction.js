import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class EventEntryAction extends Component {

  render() {
    return (
      <>
        <a>[Edit]</a>
        {'   '}
        <a>[Remove]</a>
      </>
    );
  }
}

export default EventEntryAction;
