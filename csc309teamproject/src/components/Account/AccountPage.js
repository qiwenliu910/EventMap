import React, { useState } from 'react';
import EventItem from "./EventItem"
import EventDetails from "./EventDetails"
import "./AccountPage.css"

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
        <div className="accountInfoTitle"><h1>Account Info</h1></div>
        <div className="accountName">
          <h2>Display Name: {this.props.state.currentUser.displayName}</h2>
        </div>
        <div className="accountStats">
         <h2>Account Statistics </h2>
         <h3 class="profileStatsTitle1">Events posted:</h3>
         <div class="profileStatsNumber1">{this.props.state.currentUser.events.length}</div>
         <h3 class="profileStatsTitle2">Times voted:</h3>
          <div class="profileStatsNumber2">{this.props.state.currentUser.upvote.length +
                this.props.state.currentUser.downvote.length}
          </div>
        </div>
      </div>
    );
  }
}


export default AccountPage;
