import React from 'react';
import { Container } from 'react-bootstrap'
import HomeMap from '../Home/HomeMap'
class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <HomeMap actions={this.props.actions} />
    );
  }
}


export default Home;
