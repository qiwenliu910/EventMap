import React, {Component } from 'react';
import {Card, Button} from 'react-bootstrap'
class CrimeDisplay extends Component {
    render() {
        return (
           <div>
                <Card style={{ width: '25rem', position: "absolute", top: 55, right: 0, height: "100vh"}}>
                <Card.Header as="h2">Crime Info</Card.Header>
                <Card.Body>
                <Card.Title as="h3" >{this.props.crimeTitle}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">posted by: {this.props.crimeArthor}</Card.Subtitle>
                <Card.Text> {this.props.crimeDescription} </Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted">posted at {this.props.crimeDate}</Card.Footer>
                <Button variant="outline-primary" size="sm">Upvote</Button>
                <Button variant="outline-primary" size="sm">Downvote</Button>
                </Card>
           </div>
           
        );
    }
}
export default CrimeDisplay