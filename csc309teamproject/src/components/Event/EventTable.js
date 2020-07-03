import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap'
import TableItem from "./EventTableItem"
import "./EventPage.css"

class EventTable extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        maxEventDisplay: 5,
        currentPage:0,
        eventList: [],
        totalEvents:0,
      }
    }
    componentDidMount = () => {
      // [*] Exchanging data with external source
        this.props.actions.getEvents(-1, -1).then((ret) => {
          this.setState({
            maxEventDisplay: 5,
            currentPage:0,
            eventList: ret.events,
            totalEvents:ret.totalEntries
          });
        });
    }
    onSubmitPrev = (e) => {
      e.preventDefault();
      this.setState({
        currentPage: this.state.currentPage > 0 ? this.state.currentPage - 1 : 0,
      });
    }
    onSubmitNext = (e) => {
      e.preventDefault();
      this.setState({
        currentPage: (this.state.currentPage+1)*this.state.maxEventDisplay < this.state.totalEvents? this.state.currentPage + 1 : this.state.currentPage,
      });
    }
    selectEvent = (eventId) =>{
      this.props.selectEvent(eventId)
    }

  render() {
    return (
      <div className="eventPageTable">
        <table>
          <tbody>
            <tr className="tableRow">
              <th>
                Type
              </th>
              <th>
                Date
              </th>
              <th>
                Title
              </th>
              <th>
                Votes
              </th>
              <th>
                Details
              </th>
            </tr>
            {
              this.props.sort === 0 ?
                <>
                  {this.state.eventList.sort((a,b) => a.TITLE>b.TITLE?1:-1)
                    .slice(this.state.currentPage*this.state.maxEventDisplay,
                      this.state.currentPage*this.state.maxEventDisplay+this.state.maxEventDisplay < this.state.totalEvents ?
                          this.state.currentPage*this.state.maxEventDisplay+this.state.maxEventDisplay:
                          this.state.totalEvents)
                    .map((event) => (
                    <TableItem key={event.CRIME_ID} event={event} selectEvent={this.selectEvent}/>
                  ))}
                </>
                :
                null
            }
            {
              this.props.sort === 1 ?
                <>
                  {this.state.eventList.sort((a,b) => a.DATE<b.DATE?1:-1)
                    .slice(this.state.currentPage*this.state.maxEventDisplay,
                      this.state.currentPage*this.state.maxEventDisplay+this.state.maxEventDisplay < this.state.totalEvents ?
                          this.state.currentPage*this.state.maxEventDisplay+this.state.maxEventDisplay:
                          this.state.totalEvents)
                    .map((event) => (
                    <TableItem key={event.CRIME_ID} event={event} selectEvent={this.selectEvent}/>
                  ))}
                </>
                :
                null
            }
            {
              this.props.sort === 2 ?
                <>
                  {this.state.eventList.sort((a,b) => a.VOTE<b.VOTE?1:-1)
                    .slice(this.state.currentPage*this.state.maxEventDisplay,
                      this.state.currentPage*this.state.maxEventDisplay+this.state.maxEventDisplay < this.state.totalEvents ?
                          this.state.currentPage*this.state.maxEventDisplay+this.state.maxEventDisplay:
                          this.state.totalEvents)
                    .map((event) => (
                    <TableItem key={event.CRIME_ID} event={event} selectEvent={this.selectEvent}/>
                  ))}
                </>
                :
                null
            }
            {
              this.props.sort === 3 ?
                <>
                  {this.state.eventList.sort((a,b) => a.TYPE<=b.TYPE?1:-1)
                    .slice(this.state.currentPage*this.state.maxEventDisplay,
                      this.state.currentPage*this.state.maxEventDisplay+this.state.maxEventDisplay < this.state.totalEvents ?
                          this.state.currentPage*this.state.maxEventDisplay+this.state.maxEventDisplay:
                          this.state.totalEvents)
                    .map((event) => (
                    <TableItem key={event.CRIME_ID} event={event} selectEvent={this.selectEvent}/>
                  ))}
                </>
                :
                null
            }
          </tbody>
        </table>
        <span className="tablePageButton">
          <Button className="tablePrev" variant="primary" type="submit" onClick={this.onSubmitPrev}>
            Prev
          </Button>
          <Button className="tableNext" variant="primary" type="submit" onClick={this.onSubmitNext}>
            Next
          </Button>
        </span>
      </div>
    );
  }
}


export default EventTable;
