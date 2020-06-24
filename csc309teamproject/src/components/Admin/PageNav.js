import React from 'react';
import { Button } from 'react-bootstrap'


class PageNav extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Button value="<<" variant="primary">{'<<'}</Button>{' '}
        <Button value="<<" variant="primary">{'< '}</Button>{' '}
        {'1 of 6 '}
        <Button value="<<" variant="primary">{'>'}</Button>{' '}
        <Button value="<<" variant="primary">{'>>'}</Button>
      </div>
    );
  }

}


export default PageNav;
