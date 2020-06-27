import React, {Component } from 'react';
import {Card, Button} from 'react-bootstrap'
import { Route } from 'react-router-dom';
class CrimeDisplay extends Component {
    constructor(props) {
        super(props);
        this.state = {    
            currentUserId: this.props.currentUserId
        }
      }

    sendData = (data) => {
        this.props.callbackFromParent(data);
    }

    render() {
        let upvote;
        let downvote;
        if (this.state.currentUserId > -1 ) {
            upvote = <Button variant="outline-primary" disabled={this.props.alreadyVote} onClick={() => this.sendData(1)} size="sm">Upvote</Button>
            downvote = <Button variant="outline-primary" disabled={this.props.alreadyVote} onClick={() => this.sendData(0)} size="sm">Downvote</Button>
            
        }
        return (
           <div>
               <Card style={{ width: '25rem', position: "absolute", top: 90, right: 0, height: "70vh"}}>
               <Card.Header as="h3">Crime Info</Card.Header>
               <Card.Body>
               <Card.Title as="h4"> Title: {this.props.crimeTitle}</Card.Title>
               <Card.Subtitle className="mb-2 text-muted">Posted by: {this.props.crimeArthor}</Card.Subtitle>
               <Card.Text> Description: {this.props.crimeDescription} </Card.Text>
               <Card.Text> Votes: {this.props.crimeVote} </Card.Text>
               </Card.Body>
               <Card.Footer className="text-muted">Posted on {this.props.crimeDate}</Card.Footer>
               {upvote}
               {downvote}
               </Card>
           </div>
        );
    }
}
export default CrimeDisplay
