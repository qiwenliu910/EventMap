import React from 'react';
import "./styles.css";
import { Container, Row, Col } from 'react-bootstrap'
import LoginInput from '../loginComponents/LoginInput'
class Login extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <Container>
        <main>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h3>Sign in</h3>
              <hr></hr>
              <LoginInput actions={this.props.actions}  />
            </Col>
          </Row>
        </main>
      </Container>
    );
  }
}




export default Login;
