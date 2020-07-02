import React from 'react';
import "./AccountPage.css"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from 'react-places-autocomplete';
import { Container, Col, Row } from 'react-bootstrap'
import Sidebar from '../Admin/Sidebar'

import { Form, Button, Alert } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';

class CreateEvent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {address: '',
                  input:'',
                  eventName: "",
                  eventType: "",
                  coordinateX: 0,
                  coordinateY: 0,
                  details: "",
                  special: true,
                  eventObj: null,
                  message: ""
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
    this.setState({ eventType: e.target.value });
  };
  onChangeSpecial = (e) => {
    this.setState({ special: e.target.value === 'true' });
  };
  
  onChangeDetails = (e) => {
    this.setState({ details: e.target.value });
  };

  render() {
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
                      </Col>
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
                    </Form.Row>
                  </Form.Group>
                  <Form.Group controlId="fldEventType">
                    <Form.Label>Event Type</Form.Label>
                    <Form.Control as="select" value={this.state.eventType} onChange={this.onChangeEventType}>
                      <option>Assualt</option>
                      <option>Robbery</option>
                      <option>Disease</option>
                      <option>Fire</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="fldEventLocation">
                    <Form.Label>Event Location</Form.Label>
                    {searchLocation}
                    <Form.Control type="text" value={this.state.input} readOnly/>
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
                  </Form.Group>
                  <Form.Row>
                    <Col className="right"><Button variant="primary" type="submit" >Save</Button></Col>
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
