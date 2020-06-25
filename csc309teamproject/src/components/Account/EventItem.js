import React from 'react';
import { Form, Button } from 'react-bootstrap'
import * as eventData from "../../data/crimeData.json"

class EventItem extends React.Component {

  onSubmit = (e) => {
    e.preventDefault();
    console.log("potp")
    this.props.selectEvent(this.props.eventNum)
  }

  render() {
    const eventsPosted = eventData.crimeList.filter((eventItem)=>(
      eventItem.properties.CRIME_ID === this.props.eventNum))
    console.log(eventData.crimeList[this.props.event - 1])
    return (
      <tr>
        <th>
          {eventsPosted.map((eventItem)=>(
            <p> {eventItem.properties.TITLE} </p>
          ))}
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
