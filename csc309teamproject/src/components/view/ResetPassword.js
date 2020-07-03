import React from 'react';
import "./styles.css";
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'

class ResetPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      message: "",
      linkSent: false
    };
  }

  onChangeEmail = (e) => {
    this.setState({ email: e.target.value, linkSent: false });
  }

  onSubmit = (e) => {
    e.preventDefault();
    let email = this.state.email;

    // [*] Exchanging data with external source
    this.props.actions.resetPassword(email).then((ret) => {
      if (ret.success) {
        this.setState({ linkSent: true });
      }
      else {
        this.setState({ message: ret.message });
      }
    });
  }
  
  render() {
    const disabled = this.state.linkSent;
    return (
      <Container>
        <main>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h3>Forgot password</h3>
              <hr></hr>
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
              <Form>
                <Form.Group controlId="fldEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} />
                  {
                    this.state.linkSent ?
                      <Form.Text className="text-success">Password reset link sent</Form.Text>
                      :
                      null
                  }
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.onSubmit} disabled={disabled}>
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
