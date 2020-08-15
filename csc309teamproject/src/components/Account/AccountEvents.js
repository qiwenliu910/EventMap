import React from 'react';
import EventItem from "./EventItem"
import EventDetails from "./EventDetails"
import EventEdit from './EventEdit'
import "./AccountPage.css"
class AccountEvents extends React.Component {
  state = {
    currentEventId: 0,
    event:{
      properties: {
        eventId: 0,
        type: "",
        address: "",
        author: "",
        date:"",
        type: "",
        description: ""
      },
      geometry: {
      }
    },
    buttonPressed:0,// 1 = details, 2 = edit, 3 = delete
  }


  render() {
    const selectEvent = (eventNum) =>{
        this.setState({currentEventId: eventNum})
      }
    const buttonClick = (button) =>{
      this.setState({buttonPressed: button})

    }
    let display;
    if (this.state.buttonPressed === 2) {
      display = <div><div id="eventHeader">Edit:</div><div id="eventDetails"><EventEdit key={this.state.currentEventId} currentEvent= {this.state.currentEventId} actions={this.props.actions} /> </div></div>
    }
    else if (this.state.buttonPressed === 1){
      display = <div><div id="eventHeader">Details:</div><div id="eventDetails"><EventDetails key={this.state.currentEventId} currentEvent= {this.state.currentEventId} actions={this.props.actions} /></div></div>
    }
    return (
      <div id="eventDisplay">
        <div id="eventHeader">
          Events Posted:
        </div>
        <table id="eventTable">
          <tbody>
            <tr>
              <th className="tableTitleHeader">
                  Title
              </th>
              <th className="tableButtonHeader">
                  Details
              </th>
              <th className="tableButtonHeader">
                  Edit
              </th>
              <th className="tableButtonHeader">
                  Delete
              </th>
            </tr>
            {this.props.state.currentUser.events.map((eventId) => (
              <EventItem key={eventId} eventNum={eventId} buttonClick={buttonClick}selectEvent={selectEvent} actions={this.props.actions} />
            ))}
          </tbody>
        </table>

        {/* <div id="eventHeader">
          Details:
        </div>
        <div id="eventDetails">
          <EventDetails key={this.state.currentEventId} currentEvent= {this.state.currentEventId} actions={this.props.actions} />
        </div> */}
        <div>
          {display}
        </div>
      </div>
    );
  }
}


export default AccountEvents;
