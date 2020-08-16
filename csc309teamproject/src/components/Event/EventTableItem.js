import React from 'react';
import { Button } from 'react-bootstrap'
import "./EventPage.css"
import diseaseGreen from "../../images/disease-green.png"
import diseaseYellow from "../../images/disease-yellow.png"
import diseaseOrange from "../../images/disease-orange.png"
import diseaseRed from "../../images/disease-red.png"
import robberyGreen from "../../images/robbery-green.png"
import robberyYellow from "../../images/robbery-yellow.png"
import robberyOrange from "../../images/robbery-orange.png"
import robberyRed from "../../images/robbery-red.png"
import fireGreen from "../../images/fire-green.png"
import fireYellow from "../../images/fire-yellow.png"
import fireOrange from "../../images/fire-orange.png"
import fireRed from "../../images/fire-red.png"
import assualtGreen from "../../images/assualt-green.png"
import assualtYellow from "../../images/assualt-yellow.png"
import assualtOrange from "../../images/assualt-orange.png"
import assualtRed from "../../images/assualt-red.png"

import specialDisease from "../../images/disease-special.png"
import specialRobbery from "../../images/robbery-special.png"
import specialFire from "../../images/fire-special.png"
import specialAssualt from "../../images/assualt-special.png"

class EventTableItem extends React.Component {
  constructor(props) {
    super(props);
    this.diseaseLevel = [diseaseGreen, diseaseYellow, diseaseOrange, diseaseRed];
    this.robberyLevel = [robberyGreen, robberyYellow, robberyOrange, robberyRed];
    this.fireLevel = [fireGreen, fireYellow, fireOrange, fireRed];
    this.assualtLevel = [assualtGreen, assualtYellow, assualtOrange, assualtRed];
    this.specialType = [specialDisease, specialRobbery, specialFire, specialAssualt];
    this.eventType = [this.diseaseLevel, this.robberyLevel, this.fireLevel, this.assualtLevel]
  }
  onSubmitDetails = (e) => {
    e.preventDefault();
    this.props.selectEvent(this.props.event._id)
  }

  render() {
    return (
        <tr>
          <th>
            <img src={this.props.event.special === true?this.specialType[this.props.event.type]:
              this.eventType[this.props.event.type][this.props.event.severity]} alt="eventType"/>
          </th><th>
            {this.props.event.date}
          </th><th>
            {this.props.event.title}
          </th><th>
            {this.props.event.vote}
          </th><th>
            <Button className="tableDetails" variant="primary" type="submit" onClick={this.onSubmitDetails}>
            </Button>
          </th>
        </tr>
    );
  }
}


export default EventTableItem;
