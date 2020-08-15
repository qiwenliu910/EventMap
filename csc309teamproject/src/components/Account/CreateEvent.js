import React from 'react';
import "./AccountPage.css"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Container, Col, Row } from 'react-bootstrap'

import { Form, Button } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
class CreateEvent extends React.Component {
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
                  specialBool: false,
                  special: "",
                  eventObj: null,
                  message: "",
                  eventSeverity: null,
                  eventDate: null,
                  redirect: false,
                  eventNameWarning: "",
                  eventSeverityWarning: "",
                  eventDateWarning:"",
                  eventLocationWarning:"",
                  eventDetailWarning: ""
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
      this.setState({special:"Special"})
      this.setState({specialBool:true})
      
    }
    else if (e.target.value === "Normal") {
      this.setState({special: "Normal"})
      this.setState({ specialBool:false})
    }
    // this.setState({ special: e.target.value === 'true' });
    console.log(this.state.special)
    console.log(this.state.specialBool)
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
      this.setState({ eventSeverityWarning: "Please enter a valid severity" });
      valid = false;
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
      author: this.props.state.currentUser._id,
      date: this.state.eventDate,
      severity: this.state.eventSeverity,
      type: this.state.eventTypeNum,
      special: this.state.specialBool,
      coordinateX: this.state.coordinateX,
      coordinateY: this.state.coordinateY,
      details:this.state.details
    };
    // [*] Exchanging data with external source
    this.props.actions.createEvent(newEvent).then((success) => {
      if (success === true) {
        alert('New Event Created');
        this.setState({eventName: '', redirect: true, eventType: '', eventSeverity: null, eventDate: null,coordinateX: 0,
        coordinateY: 0, details: ""});

        this.setState({ redirect: true});

         setTimeout(() => {
          this.setState({ redirect: true });
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
              ? { backgroundColor: '#e1e1e1', cursor: 'default' }
              : { backgroundColor: '#ffffff', cursor: 'default' };
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
              <Row><h3>Create Event</h3></Row>
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
                    <Form.Control as="select" value={this.state.special} onChange={this.onChangeSpecial}>
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
export default CreateEvent
