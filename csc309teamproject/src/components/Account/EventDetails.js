import React from 'react';
import * as eventData from "../../data/crimeData.json"

class EventDetails extends React.Component {
  state = {
    properties: {
      CRIME_ID: 0,
      TITLE: "",
      ADDRESS: "",
      ARTHOR: "",
      DATE:"",
      TYPE: "",
      DESCRIPTION: ""
    }
  }
  changeProperty = (property) => {
    this.setState({properties: property})

  }


  render() {
    const eventDetails = eventData.crimeList.filter((eventItem)=>(
      eventItem.properties.CRIME_ID === this.props.currentEvent))
    if(eventDetails.length != 0){
      if(this.state.properties.CRIME_ID == 0){
        this.changeProperty(eventDetails[0].properties)
      }
    }
    return (
      <div>
        <ul>
        Title: {this.state.properties.TITLE}
        </ul><ul>
        Address: {this.state.properties.ADDRESS}
        </ul><ul>
        Date: {this.state.properties.DATE}
        </ul><ul>
        Type: {this.state.properties.TYPE}
        </ul><ul>
        Description: {this.state.properties.DESCRIPTION}
        </ul>
      </div>
    );
  }
}


export default EventDetails;
