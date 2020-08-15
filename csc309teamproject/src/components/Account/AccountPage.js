import React from 'react';
import "./AccountPage.css"

class AccountPage extends React.Component {
  state = {
    events: [],
    upvote: [],
    downvote: []
  }
  componentDidMount = () => {
    this.loadEvents();
  }
  loadEvents = () => {
    this.props.actions.getUser(this.props.actions.app.state.currentUser._id).then(user => {
      if (user !== null) {
        this.setState({
          events: user.events,
          upvote: user.upvote,
          downvote: user.downvote
        });
      }
    });
  }
  render() {
    return (
      <div id="accountInfo">
        <div className="accountInfoTitle"><h1>Account Info</h1></div>
        <div className="accountName">
          <h2>Display Name: {this.props.state.currentUser.displayName}</h2>
        </div>
        <div className="accountStats">
         <h2>Account Statistics </h2>
         <h3 class="profileStatsTitle1">Events posted:</h3>
         <div class="profileStatsNumber1">{this.state.events.length}</div>
         <h3 class="profileStatsTitle2">Times voted:</h3>
          <div class="profileStatsNumber2">{this.state.upvote.length +
                this.state.downvote.length}
          </div>
        </div>
      </div>
    );
  }
}


export default AccountPage;
