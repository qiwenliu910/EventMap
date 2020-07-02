import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import EventTable from "./EventTable"
import EventDetails from "../Account/EventDetails"
import "./EventPage.css"

class EventPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        sort:0,
        currentEvent:0
      }
  }
  onSubmitSortTitle = (e) => {
    e.preventDefault();
    this.setState({ sort:0 });
  }
  onSubmitSortType = (e) => {
    e.preventDefault();
    this.setState({ sort:3 });
  }
  onSubmitSortDate = (e) => {
    e.preventDefault();
    this.setState({ sort:1 });
  }
  onSubmitSortVotes = (e) => {
    e.preventDefault();
    this.setState({ sort:2 });
  }
  selectEvent = (eventId) =>{
    this.setState({ currentEvent:eventId });
  }


  render() {
    return (
      <div id="eventPage">
        <h1>Events</h1>
        <h3>Sort by:
          <span>
            <Button className="tableSortBy" variant="primary" type="submit" onClick={this.onSubmitSortTitle}>
              Title
            </Button>
            <Button className="tableSortBy" variant="primary" type="submit" onClick={this.onSubmitSortType}>
              Type
            </Button>
            <Button className="tableSortBy" variant="primary" type="submit" onClick={this.onSubmitSortVotes}>
              Importance
            </Button>
            <Button className="tableSortBy" variant="primary" type="submit" onClick={this.onSubmitSortDate}>
              Date
            </Button>
          </span>
        </h3>
        <EventTable state={this.props.state} actions={this.props.actions} sort={this.state.sort} selectEvent={this.selectEvent}/>
        <EventDetails key={this.state.currentEvent} currentEvent= {this.state.currentEvent} actions={this.props.actions}/>
      </div>
    );
  }
}


export default EventPage;
