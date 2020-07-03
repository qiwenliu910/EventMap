import React from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import Sidebar from '../Admin/Sidebar'
class AdminDashboard extends React.Component {
  constructor(props) {
    super(props);
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
              <h3>DashBoard</h3>
              <p>Please select an option on the left side</p>
            </Col>
          </Row>
        </main>
      </Container>
    );
  }

}


export default AdminDashboard;
