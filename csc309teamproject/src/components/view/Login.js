import React from 'react';
import "./styles.css";
import { Container, Form, Button, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import LoginInput from '../loginComponents/LoginInput'
class Login extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {

    const checkValidLogin = ([username, password]) =>{
      console.log(username)
      console.log(password)
      const user = this.props.state.users.filter(
        (e) => e.username === username && e.password === password);
      if(user.length !== 0){
        this.props.changeUser(user[0]);
        return true;
      }
      else{
        return false;
      }
    }
    return (
      <Container>
        <main>
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <h3>Sign in</h3>
              <hr></hr>
              <LoginInput loginInput= {checkValidLogin}  />
            </Col>
          </Row>
        </main>
      </Container>
    );
  }
}




export default Login;
