import React from 'react';
import { Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap'

import "./AccountPage.css"

class SettingsPFP extends React.Component {

  render() {
    return (
      <div>
        <img src={this.props.pfp} id="accountPFP"/>
        <div className="ppButon">
          <Button variant="primary" type="submit">
            switch
          </Button>
        </div>
      </div>
    );
  }

}


export default SettingsPFP;
