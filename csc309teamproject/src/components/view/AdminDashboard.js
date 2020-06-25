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
              DashBoard
            </Col>
          </Row>
        </main>
      </Container>
    );
  }

}


export default AdminDashboard;
