import React from 'react';

class EventDetails extends React.Component {
  state = {
    event: {
      eventId: -1,
      title: "",
      address: "",
      author: "",
      date: "",
      type: "",
      description: ""
    }
  }
  componentDidMount = () => {
    // [*] Exchanging data with external source
      if(this.props.currentEvent != 0){
      this.props.actions.getEvent(this.props.currentEvent).then((event) =>{
        if (event !== null) {
          this.setState({ event: event });
        }
      });
    }
  }

  render() {

    return (
      <div>
        <ul>
          Title: {this.state.event.title}
        </ul><ul>
          Address: {this.state.event.address}
        </ul><ul>
          Date: {this.state.event.date}
        </ul><ul>
          Type: {this.state.event.type === 0? "Disease":null}
          {this.state.event.type === 1? "Robbery":null}
          {this.state.event.type === 2? "Fire":null}
          {this.state.event.type === 3? "Assualt":null}
        </ul><ul>
          Description: {this.state.event.description}
        </ul>
      </div>
    );
  }
}


export default EventDetails;
