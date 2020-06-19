import React from 'react';
import "./styles.css";
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <main>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h3>Create your account</h3>
              <hr></hr>
              <Form>
                <Form.Group controlId="fldEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Form.Group controlId="fldDisplayName">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter display name" />
                </Form.Group>
                <Form.Group controlId="fldPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group controlId="fldRepeatPassword">
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control type="password" placeholder="Re-enter password" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Create account
                </Button>
              </Form>
            </Col>
          </Row>
        </main>
      </Container>
    );
  }
}




export default CreateAccount;
