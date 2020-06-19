import React from 'react';
import "./styles.css";
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <Container>
        <main>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h3>Forgot password</h3>
              <hr></hr>
              <Form>
                <Form.Group controlId="fldEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Reset password
                </Button>
              </Form>
            </Col>
          </Row>
        </main>
      </Container>
    );
  }
}




export default ResetPassword;
