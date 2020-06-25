import React from 'react';
import { Form, Button } from 'react-bootstrap'

class EventItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      event: {
        TITLE: ""
      }
    };
  }

  onSubmit = (e) => {
    e.preventDefault();
    console.log("potp")
    this.props.selectEvent(this.props.eventNum)
    
  }
  componentDidMount = () => {
    this.props.actions.getEvent(this.props.eventNum).then((event) => {
      if (event !== null)
        this.setState({event: event});
    });
  }
  render() {
    return (
      <tr>
        <th>
            <p> {this.state.event.TITLE} </p>
        </th>
        <th>
          <Button variant="primary" type="submit" onClick={this.onSubmit}>
              Details
          </Button>
        </th>
      </tr>
    );
  }
}


export default EventItem;
