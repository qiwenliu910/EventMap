import React from 'react';
import "./styles.css";
import { Container, Form, Button, Row, Col, Alert } from 'react-bootstrap'
import { Redirect } from 'react-router-dom';
class CreateAccount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      displayName: "",
      password: "",
      repeatPassword: "",
      emailWarning: "",
      displayNameWarning: "",
      passwordWarning: "",
      repeatPasswordWarning: "",
      message: "",
      userCreated: false,
      redirect: false
    };
  }
  onChangeEmail = (e) => {
    this.setState({ email: e.target.value });
  }
  onChangeDisplayName = (e) => {
    this.setState({ displayName: e.target.value });
  }
  onChangePassword = (e) => {
    this.setState({ password: e.target.value });
  }
  onChangeRepeatPassword = (e) => {
    this.setState({ repeatPassword: e.target.value });
  }
  clearWarnings = () => {
    this.setState({
      emailWarning: "",
      displayNameWarning: "",
      passwordWarning: "",
      repeatPasswordWarning: "",
      message: ""
    });
  }
  onSubmit = (e) => {
    e.preventDefault();
    // frontend validation
    this.clearWarnings();
    let valid = true;
    if (this.state.email.trim() === "") {
      this.setState({ emailWarning: "Please enter a valid email address" });
      valid = false;
    }
    if (this.state.displayName.trim() === "") {
      this.setState({ displayNameWarning: "Please enter a valid display name" });
      valid = false;
    }
    if (this.state.password.trim() === "") {
      this.setState({ passwordWarning: "Please enter a password" });
      valid = false;
    }
    if (this.state.password !== this.state.repeatPassword) {
      valid = false;
    }
    if (valid === false)
      return;
    let user = {

    };
    // [*] Exchanging data with external source
    this.props.actions.createUser(user).then((ret) => {
      if (ret.success === true) {
        this.setState({ userCreated: true });
        this.setState({ message: "Your account has been created successfully, you will be redirected to the login page..." });
        setTimeout(() => {
          this.setState({ redirect: true });
        }, 3000);
      }
      else {
        this.setState({ message: ret.message });
      }
    });
  }
  render() {
    const disabled = this.state.userCreated;
    if (this.state.redirect)
      return <Redirect push to="/login" />;
    
    return (
      <Container>
        <main>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h3>Create your account</h3>
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
                  <Form.Control type="email" placeholder="Enter email" value={this.state.email} onChange={this.onChangeEmail} disabled={disabled} />
                  {
                    this.state.emailWarning !== "" ?
                      <Form.Text className="text-danger">{this.state.emailWarning}</Form.Text>
                      :
                      null
                  }
                </Form.Group>
                <Form.Group controlId="fldDisplayName">
                  <Form.Label>Display Name</Form.Label>
                  <Form.Control type="text" placeholder="Enter display name" value={this.state.displayName} onChange={this.onChangeDisplayName} disabled={disabled} />
                  {
                    this.state.displayNameWarning !== "" ?
                      <Form.Text className="text-danger">{this.state.displayNameWarning}</Form.Text>
                      :
                      null
                  }
                </Form.Group>
                <Form.Group controlId="fldPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Password" value={this.state.password} onChange={this.onChangePassword} disabled={disabled} />
                  {
                    this.state.passwordWarning !== "" ?
                      <Form.Text className="text-danger">{this.state.passwordWarning}</Form.Text>
                      :
                      null
                  }
                </Form.Group>
                <Form.Group controlId="fldRepeatPassword">
                  <Form.Label>Repeat Password</Form.Label>
                  <Form.Control type="password" placeholder="Re-enter password" value={this.state.repeatPassword} onChange={this.onChangeRepeatPassword} disabled={disabled} />
                  {
                    this.state.password !== "" && this.state.password !== this.state.repeatPassword ?
                      <Form.Text className="text-danger">Your passwords much match</Form.Text>
                      :
                      null
                  }
                </Form.Group>
                <Button variant="primary" type="submit" onClick={this.onSubmit} disabled={disabled}>
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
