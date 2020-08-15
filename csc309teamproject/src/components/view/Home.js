import React from 'react';
import HomeMap from '../Home/HomeMap'
class Home extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <HomeMap state={this.props.state} actions={this.props.actions} />
    );
  }
}


export default Home;
