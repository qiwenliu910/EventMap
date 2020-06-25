import React, { useState } from 'react';
import EventItem from "./EventItem"
import EventDetails from "./EventDetails"
import "./AccountPage.css"
class AccountEvents extends React.Component {
  state = {
    currentEventId: 0,
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
        this.setState({currentEventId: eventNum})
      }

    return (
      <div>
        <div id="eventDisplay">
          events Posted:
        </div>
        <table id="eventTable">
          <tbody>
            {this.props.state.currentUser.events.map((eventNum) => (
              <EventItem key={eventNum} eventNum={eventNum} selectEvent={selectEvent} actions={this.props.actions} />
            ))}
          </tbody>
        </table>
        <div id="eventDetails">
          <EventDetails key={this.state.currentEventId} currentEvent= {this.state.currentEventId} actions={this.props.actions} />
        </div>
      </div>
    );
  }
}


export default AccountEvents;
