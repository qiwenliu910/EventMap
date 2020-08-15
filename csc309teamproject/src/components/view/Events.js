import React from 'react';
import EventPage from '../Event/EventPage'

class Events extends React.Component {
  // constructor(props) {
  //   super(props);
  // }

  render() {
    return (
      <EventPage state={this.props.state} actions={this.props.actions}/>
    );
  }

}


export default Events;
