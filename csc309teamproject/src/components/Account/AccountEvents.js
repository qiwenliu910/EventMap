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
    },
    buttonPressed:0,// 1 = details, 2 = edit, 3 = delete
  }


  render() {
    const selectEvent = (eventNum) =>{
        this.setState({currentEventId: eventNum})
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
            {this.props.state.currentUser.events.map((eventNum) => (
              <EventItem key={eventNum} eventNum={eventNum} selectEvent={selectEvent} actions={this.props.actions} />
            ))}
          </tbody>
        </table>
        <div id="eventHeader">
          Details:
        </div>
        <div id="eventDetails">
          <EventDetails key={this.state.currentEventId} currentEvent= {this.state.currentEventId} actions={this.props.actions} />
        </div>
      </div>
    );
  }
}


export default AccountEvents;
