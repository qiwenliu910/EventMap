import React from 'react';
import { Container, Col, Row } from 'react-bootstrap'
import EventManagementGrid from '../Admin/EventManagementGrid'
import Sidebar from '../Admin/Sidebar'
import PageNav from '../Admin/PageNav'
class AdminEventManagement extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      currentPage: 0,
      totalPages: 0,
      entryPerPage: 3
    };

  }
  componentDidMount() {
    this.loadEntries(1);
  }

  loadEntries(pageNum) {
    const skip = (pageNum - 1) * this.state.entryPerPage;
    const take = this.state.entryPerPage;
    this.setState({ currentPage: 0 });
    // [*] Exchanging data with external source
    this.props.actions.getEvents(skip, take).then((ret) => {
      let pages = parseInt(ret.totalEntries / this.state.entryPerPage);
      if (ret.totalEntries % this.state.entryPerPage !== 0)
        pages += 1;

      this.setState({
        events: ret.events,
        currentPage: pageNum,
        totalPages: pages
      });
    });
  }

  setPage(pageNum) {
    pageNum = Math.min(pageNum, this.state.totalPages);
    pageNum = Math.max(pageNum, 1);
    this.loadEntries(pageNum);
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
                this.state.currentPage === 0 ?
                  <p>Loading</p>
                  :
                  <>
                    <Row>
                      <EventManagementGrid events={this.state.events} />
                    </Row>
                    <Row>
                      <PageNav currentPage={this.state.currentPage} totalPages={this.state.totalPages} setPage={this.setPage.bind(this)} />
                    </Row>
                  </>
              }
            </Col>
          </Row>
        </main>
      </Container>
    );
  }

}


export default AdminEventManagement;
