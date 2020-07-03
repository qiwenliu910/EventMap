import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserEntryAction extends Component {

  render() {
    return (
      <>
        <Link to={'/admin/user/' + this.props.userId}>[Edit]</Link>
        {'   '}
        <a>[Remove]</a>
      </>
    );
  }
}

export default UserEntryAction;
