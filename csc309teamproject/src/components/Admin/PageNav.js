import React from 'react';
import { Button } from 'react-bootstrap'


class PageNav extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    const prevDisabled = (this.props.currentPage === 1);
    const nextDisabled = (this.props.currentPage === this.props.totalPages);
    return (
      <div>
        <Button variant="primary" onClick={() => {this.props.setPage(1)}} disabled={prevDisabled}>{'<<'}</Button>{' '}
        <Button variant="primary" onClick={() => {this.props.setPage(this.props.currentPage - 1)}} disabled={prevDisabled} >{'< '}</Button>{' '}
        {this.props.currentPage + ' of ' + this.props.totalPages + ' '}
        <Button variant="primary" onClick={() => {this.props.setPage(this.props.currentPage + 1)}} disabled={nextDisabled}>{'>'}</Button>{' '}
        <Button variant="primary" onClick={() => {this.props.setPage(this.props.totalPages)}} disabled={nextDisabled}>{'>>'}</Button>
      </div>
    );
  }

}


export default PageNav;
