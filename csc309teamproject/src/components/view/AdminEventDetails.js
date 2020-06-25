import React from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import Sidebar from '../Admin/Sidebar'

import { Form, Button, Alert } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom';


class AdminEventDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eventName: "",
      eventType: "",
      coordinateX: 0,
      coordinateY: 0,
      details: "",
      special: true,
      error: ""
    };
  }

  componentDidMount() {
    this.loadEvent(this.props.eventId);
  }

  onChangeEventName = (e) => {
    this.setState({ eventName: e.target.value });
  }
  onChangeEventType = (e) => {
    this.setState({ eventType: e.target.value });
  }
  onChangeSpecial = (e) => {
    this.setState({ special: e.target.value === 'true' });
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


  loadEvent(eventId) {
    this.props.actions.getEvent(eventId).then((event) => {

      if (event !== null) {
        this.setState({
          eventName: event.TITLE,
          eventType: event.TYPE,
          coordinateX: event.coordinates[0],
          coordinateY: event.coordinates[1],
          details: event.DESCRIPTION,
          special: false
        });
      }
      else {
        this.setState({
          error: "Fails loading event details"
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
                this.state.error !== '' ?
                  <>
                    <Row>
                      <Alert className="wide" variant='warning'>{this.state.error}</Alert>
                    </Row>
                  </>
                  :
                  null
              }


              <Row><h3>Edit Event</h3></Row>
              <Row>
                <Form>
                  <Form.Group controlId="fldEventName">
                    <Form.Label>Event Name</Form.Label>
                    <Form.Row>
                      <Col>
                        <Form.Control type="text" placeholder="Enter event name" value={this.state.eventName} onChange={this.onChangeEventName} />
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
                    <Col className="right"><Button variant="primary" type="submit">Save</Button></Col>
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
