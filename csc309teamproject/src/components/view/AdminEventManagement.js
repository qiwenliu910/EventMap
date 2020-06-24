import React from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import EventManagementGrid from '../Admin/EventManagementGrid'
import Sidebar from '../Admin/Sidebar'
import PageNav from '../Admin/PageNav'
class AdminEventManagement extends React.Component {
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
              <Row>
                <EventManagementGrid />
              </Row>
              <Row>
                <PageNav />
              </Row>
            </Col>
          </Row>
        </main>
      </Container>
    );
  }

}


export default AdminEventManagement;
