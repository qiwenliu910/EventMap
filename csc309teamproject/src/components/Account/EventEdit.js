import React from 'react';
import "./AccountPage.css"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Container, Col, Row } from 'react-bootstrap'

import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
class EventEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {address: '',
                  input:'',
                  eventName: "",
                  eventType: "",
                  eventTypeNum : 3,
                  coordinateX: 0,
                  coordinateY: 0,
                  details: "",
                  special: false,
                  specialString: '',
                  eventObj: null,
                  message: "",
                  eventSeverity: null,
                  eventDate: null,
                  redirect: false,
                  eventNameWarning: "",
                  eventSeverityWarning: "",
                  eventDateWarning:"",
                  eventLocationWarning:"",
                  eventDetailWarning: "",
                  eventItself: null,
                  };
  }

  handleChange = address => {
    this.setState({ address });
  };

  handleSelect = async address => {
    const results = await geocodeByAddress(address);
    this.setState({input:results[0].formatted_address });
    const latLng = await getLatLng(results[0]);
    this.setState({coordinateX: latLng.lat});
    this.setState({coordinateY: latLng.lng});

  };
  componentDidMount = () => {
    // [*] Exchanging data with external source

    this.props.actions.getEvent(this.props.currentEvent).then((e) => {
      console.log(e)
      if (e !== null)
        this.setState({eventItself: e,
                    input:e.address,
                    eventName:e.title,
                    eventTypeNum:e.type,
                    eventSeverity:e.severity,
                    eventDate:e.date,
                    details:e.description,
                    coordinateY:e.coordinates[0],
                    coordinateX:e.coordinates[1],
                    special:e.special

        });
        if (this.state.eventTypeNum === 0) {
            this.setState({eventType:"Disease"})
        }
        else if (this.state.eventTypeNum === 1) {
            this.setState({eventType:"Robbery"})
        }
        else if (this.state.eventTypeNum === 2) {
            this.setState({eventType:"Fire"})
        }
        else if (this.state.eventTypeNum === 3) {
            this.setState({eventType:"Assault"})
        }
        if (this.state.special) {
            this.setState({specialString: "Special"})
        }
        else if (!this.state.special) {
            this.setState({specialString:"Normal"})
        }
        console.log(this.state.eventItself)
    });
  }
  onChangeEventName = (e) => {
    this.setState({ eventName: e.target.value });
  };
  onChangeEventType = (e) => {
    if (e.target.value === "Disease") {
      this.setState({ eventTypeNum: 0})
    }
    else if (e.target.value === "Robbery") {
      this.setState({ eventTypeNum: 1})
    }
    else if (e.target.value === "Fire") {
      this.setState({ eventTypeNum: 2})
    }
    else if (e.target.value === "Assault") {
      this.setState({ eventTypeNum: 3})
    }
    this.setState({ eventType: e.target.value });
  };
  onChangeSpecial = (e) => {
    if (e.target.value === "Special") {
        this.setState({specialString:"Special"})
        this.setState({special:true})
        
      }
      else if (e.target.value === "Normal") {
        this.setState({specialString: "Normal"})
        this.setState({ special:false})
      }
    // this.setState({ special: e.target.value === 'true' });
  };

  onChangeDetails = (e) => {
    this.setState({ details: e.target.value });
  };
  onChangeEventSeverity = (e) => {
    this.setState({ eventSeverity: e.target.value });
  };
  onChangeEventDate = (e) => {
    this.setState({ eventDate: e.target.value });
  };
  clearWarnings = () => {
    this.setState({
      eventNameWarning: "",
      eventSeverityWarning: "",
      eventDateWarning:"",
      eventLocationWarning:"",
      eventDetailWarning: ""
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    // frontend validation
    this.clearWarnings();
    let valid = true;
    if (this.state.eventName.trim() === "") {
      this.setState({ eventNameWarning: "Please enter a valid event name" });
      valid = false;
    }
    if (this.state.input.trim() === "") {
      this.setState({ eventLocationWarning: "Please enter a valid address" });
      valid = false;
    }
    if (this.state.details.trim() === "") {
      this.setState({ eventDetailWarning: "Please enter a valid detail" });
      valid = false;
    }
    if (this.state.eventSeverity !== "0" && this.state.eventSeverity !== "1" && this.state.eventSeverity !== "2" && this.state.eventSeverity !== "3") {
        if (this.state.eventSeverity !== 0 && this.state.eventSeverity !== 1 && this.state.eventSeverity !== 2 && this.state.eventSeverity !== 3) {
            this.setState({ eventSeverityWarning: "Please enter a valid severity" });
            valid = false;
        }
    }
    if(this.state.eventDate === null) {
      this.setState({ eventDateWarning: "Please enter a valid date" });
      valid = false;
    }
    if (this.state.eventDate !== null) {
      const inputDate = new Date (this.state.eventDate)
      const todayDate = new Date ()
      console.log(inputDate)
      console.log(todayDate)
      if (!(inputDate <= todayDate) || inputDate === "invalid") {
        this.setState({ eventDateWarning: "Please enter a valid date" });
        valid = false;
      }
      if (this.state.eventDate.length !== 10) {
        this.setState({ eventDateWarning: "Please enter a valid date" });
        valid = false;
      }
      if(this.state.eventDate.length === 10 ) {
        if(this.state.eventDate.slice(0, 4) > todayDate.getFullYear()) {
          this.setState({ eventDateWarning: "Please enter a valid date" });
          valid = false;
        }
        if(this.state.eventDate.slice(5, 7) > 12 ||this.state.eventDate.slice(5, 7) < 1 ) {
          this.setState({ eventDateWarning: "Please enter a valid date" });
          valid = false;
        }
        if(this.state.eventDate.slice(-2) > 31 ||this.state.eventDate.slice(-2) < 1 ) {
          this.setState({ eventDateWarning: "Please enter a valid date" });
          valid = false;
        }
      }
    }
    if (valid === false)
      return;
    let newEvent = {
      title: this.state.eventName,
      address: this.state.input,
      date: this.state.eventDate,
      severity: this.state.eventSeverity,
      type: this.state.eventTypeNum,
      coordinateX: this.state.coordinateX,
      coordinateY: this.state.coordinateY,
      details:this.state.details,
      special:this.state.special
    };
    console.log(newEvent)
    // [*] Exchanging data with external source
    this.props.actions.updateEvent(newEvent, this.state.eventItself._id).then((success) => {
      if (success === true) {
        alert('Event Updated');

         setTimeout(() => {
        //   this.setState({ redirect: true });
        }, 3000);
      }
      else {
        // this.setState({ message: ret.message });
      }
    });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect push to="/" />;
    }
    let searchLocation;
    console.log(this.props)
    searchLocation = <PlacesAutocomplete
    value={this.state.address}
    onChange={this.handleChange}
    onSelect={this.handleSelect}
  >
    {({ getInputProps, suggestions, getSuggestionItemProps}) => (
      <div>
        <input {...getInputProps({ placeholder:'Search Places'})} />
        <div >
          {suggestions.map(suggestion => {
            const className = suggestion.active
              ? 'suggestion-item--active'
              : 'suggestion-item';
            const style = suggestion.active
              ? { backgroundColor: '#615d5d', cursor: 'default' }
              : { backgroundColor: '#bdb7b7', cursor: 'default' };
            return (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className,
                  style,
                })}
              >
                <span>{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </div>
    )}
  </PlacesAutocomplete>
    return (
      <div>
      <Container>
        <main>
          <Row>
            <Col md={10}>
              <Row><h3>Edit Event</h3></Row>
              <Row>
                <Form>
                  <Form.Group controlId="fldEventName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control type="text" placeholder="Enter event name" value={this.state.eventName} onChange={this.onChangeEventName}   />
                        {
                          this.state.eventNameWarning !== "" ?
                            <Form.Text className="text-danger">{this.state.eventNameWarning}</Form.Text>
                            :
                            null
                        }
                      </Col>
                    {/* {this.props.state.currentUser.admin?
                    <Col>
                    <Form.Check
                        type="checkbox"
                        id="autoSizingCheck"
                        className="mb-2"
                        label="Special Event"
                        checked={this.state.special}
                        onChange={this.onChangeSpecial}
                    />
                    </Col>
                    : null} */}
                    </Form.Row>
                  </Form.Group>
                  {/* <Form.Group controlId="fldEventSeverity">
                    <Form.Label>Event Severity</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control type="text" placeholder="Enter event severity" value={this.state.eventSeverity} onChange={this.onChangeEventSeverity}   />
                        {
                          this.state.eventSeverityWarning !== "" ?
                            <Form.Text className="text-danger">{this.state.eventSeverityWarning}</Form.Text>
                            :
                            null
                        }
                      </Col>
                    </Form.Row>
                  </Form.Group> */}
                  { this.props.state.currentUser.admin ?
                 <Form.Group controlId="fldEventSpecial">
                    <Form.Label>Event Special</Form.Label>
                    <Form.Control as="select" value={this.state.specialString} onChange={this.onChangeSpecial}>
                      <option>Normal</option>
                      <option>Special</option>
                    </Form.Control>
                  </Form.Group>
                  : null}
                  <Form.Group controlId="fldEventSeverity">
                    <Form.Label>Event Severity</Form.Label>
                    <Form.Control as="select" value={this.state.eventSeverity} onChange={this.onChangeEventSeverity}>
                      <option>0</option>
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="fldEventDate">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control type="text" placeholder="YYYY/MM/DD " value={this.state.eventDate} onChange={this.onChangeEventDate}   />
                        {
                          this.state.eventDateWarning !== "" ?
                            <Form.Text className="text-danger">{this.state.eventDateWarning}</Form.Text>
                            :
                            null
                        }
                      </Col>
                    </Form.Row>
                  </Form.Group>
                  <Form.Group controlId="fldEventType">
                    <Form.Label>Event Type</Form.Label>
                    <Form.Control as="select" value={this.state.eventType} onChange={this.onChangeEventType}>
                      <option>Assault</option>
                      <option>Robbery</option>
                      <option>Disease</option>
                      <option>Fire</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="fldEventLocation">
                    <Form.Label>Event Location</Form.Label>
                    {searchLocation}
                    <Form.Control type="text" value={this.state.input} readOnly/>
                    {
                        this.state.eventLocationWarning !== "" ?
                          <Form.Text className="text-danger">{this.state.eventLocationWarning}</Form.Text>
                          :
                          null
                      }
                  </Form.Group>
                  <Form.Row>
                  <Col>
                      <Form.Group controlId="fldX">
                        <Form.Label>Coordinates</Form.Label>
                        <Form.Control type="text" placeholder="X coordinate" value={this.state.coordinateX} readOnly/>
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="fldY">
                        <Form.Label>&nbsp;</Form.Label>
                        <Form.Control type="text" placeholder="Y coordinate" value={this.state.coordinateY} readOnly />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Group controlId="fldEventDetails">
                    <Form.Label>Event Details</Form.Label>
                    <Form.Control as="textarea" rows="3" value={this.state.details} onChange={this.onChangeDetails}/>
                    {
                        this.state.eventDetailWarning !== "" ?
                          <Form.Text className="text-danger">{this.state.eventDetailWarning}</Form.Text>
                          :
                          null
                      }
                  </Form.Group>
                  <Form.Row>
                    <Col className="right"><Button variant="primary" type="submit" onClick={this.onSubmit} >Save</Button></Col>
                  </Form.Row>
                </Form>
              </Row>
            </Col>
          </Row>
        </main>
      </Container>
      </div>
    );
  }
}
export default EventEdit
