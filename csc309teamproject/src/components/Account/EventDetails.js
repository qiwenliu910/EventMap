import React from 'react';

class EventDetails extends React.Component {
  state = {
    event: {
      CRIME_ID: -1,
      TITLE: "",
      ADDRESS: "",
      ARTHOR: "",
      DATE: "",
      TYPE: "",
      DESCRIPTION: ""
    }
  }
  componentDidMount = () => {
    this.props.actions.getEvent(this.props.currentEvent).then((event) =>{
      if (event !== null) {
        this.setState({ event: event });
      }
    });
  }

  render() {

    return (
      <div>
        <ul>
          Title: {this.state.event.TITLE}
        </ul><ul>
          Address: {this.state.event.ADDRESS}
        </ul><ul>
          Date: {this.state.event.DATE}
        </ul><ul>
          Type: {this.state.event.TYPE}
        </ul><ul>
          Description: {this.state.event.DESCRIPTION}
        </ul>
      </div>
    );
  }
}


export default EventDetails;
