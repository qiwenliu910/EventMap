import React from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import Sidebar from '../Admin/Sidebar'

import { Form, Button, Alert } from 'react-bootstrap'


class AdminEventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      eventType: 0,
      severity: 0,
      date: "",
      address: "",
      coordinateX: 0,
      coordinateY: 0,
      details: "",
      special: true,
      eventObj: null,
      message: ""
    };
  }

  componentDidMount() {
    this.loadEvent(this.props.eventId);
  }

  onChangeTitle = (e) => {
    this.setState({ title: e.target.value });
  }
  onChangeEventAddress = (e) => {
    this.setState({ address: e.target.value });
  }
  onChangeEventType = (e) => {
    this.setState({ eventType: e.target.value });
  }
  onChangeDate = (e) => {
    this.setState({ date: e.target.value });
  }
  onChangeSeverity = (e) => {
    this.setState({ severity: e.target.value });
  }
  onChangeSpecial = (e) => {
    this.setState({ special: e.target.checked === true });
  }
  onChangeCoordinateX = (e) => {
    this.setState({ coordinateX: e.target.value });
  }
  onChangeCoordinateY = (e) => {
    this.setState({ coordinateY: e.target.value });
  }
  onChangeDetails = (e) => {
    this.setState({ details: e.target.value });
  }
  onSubmit = (e) => {
    e.preventDefault();
    let event = {
      title: this.state.title,
      address: this.state.address,
      date: this.state.date,
      type: this.state.eventType,
      severity: this.state.severity,
      special: this.state.special,
      details: this.state.details,
      coordinateX: this.state.coordinateX,
      coordinateY: this.state.coordinateY
    };
    console.log(event);
    // [*] Exchanging data with external source
    this.props.actions.updateEvent(event, this.props.eventId).then((success) => {
      if (success) {
        this.setState({ message: "This event has been updated successfully" });
      }
      else {
        this.setState({ message: "Failed updating event" });
      }
    });
  }

  loadEvent(eventId) {
    // [*] Exchanging data with external source
    this.props.actions.getEvent(eventId).then((event) => {

      if (event !== null) {
        this.setState({
          title: event.title,
          eventType: event.type,
          severity: event.severity,
          date: event.date,
          coordinateX: event.coordinates[1],
          coordinateY: event.coordinates[0],
          address: event.address,
          details: event.description,
          special: false,
          eventObj: event
        });
      }
      else {
        this.setState({
          message: "Fails loading event details"
        });
      }
    });
  }

  render() {
    return (
      <Container>
        <main>
          <Row>
            <Col md={2}>
              <Sidebar />
            </Col>
            <Col md={10}>

              {
                this.state.message !== '' ?
                  <>
                    <Row>
                      <Alert className="wide" variant='warning'>{this.state.message}</Alert>
                    </Row>
                  </>
                  :
                  null
              }


              <Row><h3>Edit Event</h3></Row>
              <Row>
                <Form>
                  <Form.Group controlId="fldTitle">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control type="text" placeholder="Enter event name" value={this.state.title} onChange={this.onChangeTitle} />
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
                  <Form.Group controlId="fldSeverity">
                    <Form.Label>Event Severity</Form.Label>
                    <Form.Control as="select" value={this.state.severity} onChange={this.onChangeSeverity}>
                      <option value="0">0</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="fldEventDate">
                    <Form.Label>Event Date</Form.Label>
                    <Form.Control type="text" placeholder="YYYY/MM/DD" value={this.state.date} onChange={this.onChangeDate} />
                  </Form.Group>
                  <Form.Group controlId="fldEventType">
                    <Form.Label>Event Type</Form.Label>
                    <Form.Control as="select" value={this.state.eventType} onChange={this.onChangeEventType}>
                      <option value="0">Assualt</option>
                      <option value="1">Robbery</option>
                      <option value="2">Disease</option>
                      <option value="3">Fire</option>
                    </Form.Control>
                  </Form.Group>
                  <Form.Group controlId="fldEventAddress">
                    <Form.Label>Event Address</Form.Label>
                    <Form.Control type="text" placeholder="Enter event address" value={this.state.address} onChange={this.onChangeEventAddress} />
                  </Form.Group>
                  <Form.Row>
                    <Col>
                      <Form.Group controlId="fldX">
                        <Form.Label>Coordinates</Form.Label>
                        <Form.Control type="text" placeholder="X coordinate" value={this.state.coordinateX} onChange={this.onChangeCoordinateX} />
                      </Form.Group>
                    </Col>
                    <Col>
                      <Form.Group controlId="fldY">
                        <Form.Label>&nbsp;</Form.Label>
                        <Form.Control type="text" placeholder="Y coordinate" value={this.state.coordinateY} onChange={this.onChangeCoordinateY} />
                      </Form.Group>
                    </Col>
                  </Form.Row>
                  <Form.Group controlId="fldEventDetails">
                    <Form.Label>Event Details</Form.Label>
                    <Form.Control as="textarea" rows="3" value={this.state.details} onChange={this.onChangeDetails} />
                  </Form.Group>
                  <Form.Row>
                    <Col><Button variant="primary" type="submit">Delete</Button></Col>
                    <Col className="right"><Button variant="primary" type="submit" onClick={this.onSubmit}>Save</Button></Col>
                  </Form.Row>


                </Form>
              </Row>


            </Col>
          </Row>
        </main>
      </Container>
    );
  }

}


export default AdminEventDetails;
