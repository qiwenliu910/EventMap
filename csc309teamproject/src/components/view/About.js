import React from 'react';
import { Container } from 'react-bootstrap'
class About extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Container>
        <main>
          <h3>About</h3>
          This is a CSC309 project from team24
        </main>
      </Container>
    );
  }

}


export default About;
