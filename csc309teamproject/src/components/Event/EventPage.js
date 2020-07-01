import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import EventTable from "./EventTable"
import "./EventPage.css"

class EventPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        sort:0
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

  render() {
    console.log(this.props.actions)
    return (
      <div>
        <h1>Events</h1>
        <h3>Sort by</h3>
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
        <EventTable state={this.props.state} actions={this.props.actions} sort={this.state.sort}/>
      </div>
    );
  }
}


export default EventPage;
