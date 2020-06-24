import React, { useState } from 'react';
import EventItem from "./EventItem"
import EventDetails from "./EventDetails"
import "./AccountPage.css"
class AccountPage extends React.Component {
  state = {
    currentEvent: 0,
    event:{
      properties: {
        CRIME_ID: 0,
        TITLE: "",
        ADDRESS: "",
        ARTHOR: "",
        DATE:"",
        TYPE: "",
        DESCRIPTION: ""
      },
      geometry: {
      }
    }
  }


  render() {
    const selectEvent = (eventNum) =>{
        console.log(eventNum)
        this.setState({currentEvent: eventNum})
      }

    return (
      <div>
        <div id="accountDisplay">
          {this.props.state.currentUser.username}
        </div>
        <div id="eventDisplay">
          events Posted:
        </div>
        <table id="eventTable">
          <tbody>
            {this.props.state.currentUser.events.map((eventNum) => (
              <EventItem key={eventNum} eventNum={eventNum} selectEvent={selectEvent}/>
            ))}
          </tbody>
        </table>
        <div id="eventDetails">
          <EventDetails key={this.state.currentEvent} currentEvent= {this.state.currentEvent}/>
        </div>

      </div>
    );
  }
}


export default AccountPage;
