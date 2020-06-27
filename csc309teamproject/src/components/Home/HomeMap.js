import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import CrimeDisplay from "./CrimeDisplay.js"
import "./styles.css";

class HomeMap extends Component {
    constructor(props) {
        super(props);
        this.dispalyCrime = this.dispalyCrime.bind(this);
    
        this.state = {
            crimeTitle:"",
            crimeArthor:"",
            crimeDate:"",
            crimeDescription:"",
            crimeVote: 0,
            selectedCrime: false,
            alreadyVote: false,
            crimeList: [],
            currentUser: this.props.state.currentUser,
            
        }
      }
      componentDidMount = () => {
          this.props.actions.getEvents(-1, -1).then((ret) => {
            this.setState({ crimeList: ret.events });
          });
      }
      dispalyCrime = (crime) => {
          this.setState({selectedCrime: crime.CRIME_ID,
                        crimeTitle: crime.TITLE,
                        crimeArthor: crime.ARTHOR,
                        crimeDate: crime.DATE,
                        crimeDescription:crime.DESCRIPTION,
                        crimeVote:crime.VOTE,
                        alreadyVote: false
        })
        if (this.state.currentUser.upvote.some(item => crime.CRIME_ID === item.CRIME_ID)) {
          this.setState({alreadyVote: true});
        }
        if (this.state.currentUser.downvote.some(item => crime.CRIME_ID === item.CRIME_ID)) {
          this.setState({alreadyVote: true});
        }
        ; 
        
      }
      myCallback = (dataFromChild) => {
          const crimeNum = this.state.selectedCrime - 1;
          const voteNum = this.state.crimeVote;
          const newArr = [...this.state.crimeList];
          this.setState({alreadyVote: true});
          
          const votedCrime = {
            "CRIME_ID": crimeNum + 1
          }
          
          if (dataFromChild) {
              this.setState({crimeVote: this.state.crimeVote + 1});
              newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum + 1};
              this.setState({crimeList:newArr});
              this.state.currentUser.upvote.push(votedCrime);
              }
            
          else {
              this.setState({crimeVote: this.state.crimeVote - 1});
              newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum - 1};
              this.setState({crimeList:newArr});
              this.state.currentUser.downvote.push(votedCrime);
              }
      }

     
    
    render() {
        return (
            <div className="mapContainer">
               <Map
              google={this.props.google}
              zoom={15}
              initialCenter={{ lat:43.6629, lng: -79.3957}} 
            >
            {this.state.crimeList.map(crime => ( // List of all crimes
            
            <Marker key={crime.CRIME_ID}
            position={{
            lat: crime.coordinates[1],
            lng: crime.coordinates[0]
            }}
            onClick={() => this.dispalyCrime(crime)}
            />
        
        
      
    ))}
             
                <CrimeDisplay crimeTitle={this.state.crimeTitle}
                            crimeArthor={this.state.crimeArthor}
                            crimeDate={this.state.crimeDate}
                            crimeDescription={this.state.crimeDescription}
                            crimeVote={this.state.crimeVote}
                            alreadyVote={this.state.alreadyVote}
                            callbackFromParent = {this.myCallback}
                            currentUserId = {this.state.currentUser.id}
                            >
                            
                </CrimeDisplay>
         
            </Map>  
            
            </div>        
        );
      }
}
export default GoogleApiWrapper({
    apiKey: `AIzaSyBI0N2-bySzN31crVqCT0Mww1NifTznJ8g`
  })(HomeMap);