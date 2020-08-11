import React, { useState } from 'react';
import EventItem from "./EventItem"
import EventDetails from "./EventDetails"
import "./AccountPage.css"
import pfp from "../../images/pfp.png"

class AccountPage extends React.Component {
  state = {
  }

  render() {
    const selectEvent = (eventNum) =>{
        console.log(eventNum)
        this.setState({currentEvent: eventNum})
      }

    return (
      <div id="accountInfo">
        <img src={pfp} className="accountPFP"/>
        <div className="accountName">
          {this.props.state.currentUser.displayName}
        </div>
        <div className="accountBack"/>
        <div className="accountStats">
          <ul>
            <li>Events posted<span class="profileStatsNumber">
            {this.props.state.currentUser.events.length}</span></li>
            <li>Times voted<span class="profileStatsNumber">
            {this.props.state.currentUser.upvote.length +
            this.props.state.currentUser.downvote.length}</span></li>
          </ul>
        </div>
      </div>
    );
  }
}


export default AccountPage;
