import React, { useState } from 'react';
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
        this.props.actions.getEvents(-1, -1).then((ret) => {
          this.setState({ eventList: ret.events, totalEvents:ret.totalEntries });
        });
    }

  render() {
    return (
      <div>
        <table>
          <tbody>
            <tr>
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
                  {this.state.eventList.slice(0, this.state.totalEvents)
                    .sort((a,b) => a.TITLE>b.TITLE?1:-1)
                    .map((event) => (
                    <TableItem key={event.CRIME_ID} event={event}/>
                  ))}
                </>
                :
                null
            }
            {
              this.props.sort === 1 ?
                <>
                  {this.state.eventList.slice(0, this.state.totalEvents)
                    .sort((a,b) => a.DATE<b.DATE?1:-1)
                    .map((event) => (
                    <TableItem key={event.CRIME_ID} event={event}/>
                  ))}
                </>
                :
                null
            }
            {
              this.props.sort === 2 ?
                <>
                  {this.state.eventList.slice(0, this.state.totalEvents)
                    .sort((a,b) => a.VOTE<b.VOTE?1:-1)
                    .map((event) => (
                    <TableItem key={event.CRIME_ID} event={event}/>
                  ))}
                </>
                :
                null
            }
            {
              this.props.sort === 3 ?
                <>
                  {this.state.eventList.slice(0, this.state.totalEvents)
                    .sort((a,b) => a.TYPE<b.TYPE?1:-1)
                    .map((event) => (
                    <TableItem key={event.CRIME_ID} event={event}/>
                  ))}
                </>
                :
                null
            }
          </tbody>
        </table>
      </div>
    );
  }
}


export default EventTable;
