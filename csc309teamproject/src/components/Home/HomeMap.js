import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import CrimeDisplay from "./CrimeDisplay.js"
import "./styles.css";

import diseaseGreen from "../../images/disease-green.png"
import diseaseYellow from "../../images/disease-yellow.png"
import diseaseOrange from "../../images/disease-orange.png"
import diseaseRed from "../../images/disease-red.png"
import robberyGreen from "../../images/robbery-green.png"
import robberyYellow from "../../images/robbery-yellow.png"
import robberyOrange from "../../images/robbery-orange.png"
import robberyRed from "../../images/robbery-red.png"
import fireGreen from "../../images/fire-green.png"
import fireYellow from "../../images/fire-yellow.png"
import fireOrange from "../../images/fire-orange.png"
import fireRed from "../../images/fire-red.png"
import assualtGreen from "../../images/assualt-green.png"
import assualtYellow from "../../images/assualt-yellow.png"
import assualtOrange from "../../images/assualt-orange.png"
import assualtRed from "../../images/assualt-red.png"

import healthGreen from "../../images/health-green.png"

class HomeMap extends Component {
    constructor(props) {
        super(props);
        this.dispalyCrime = this.dispalyCrime.bind(this);
        this.diseaseLevel = [diseaseGreen, diseaseYellow, diseaseOrange, diseaseRed];
        this.robberyLevel = [robberyGreen, robberyYellow, robberyOrange, robberyRed];
        this.fireLevel = [fireGreen, fireYellow, fireOrange, fireRed];
        this.assualtLevel = [assualtGreen, assualtYellow, assualtOrange, assualtRed];
        this.eventType = [this.diseaseLevel, this.robberyLevel, this.fireLevel, this.assualtLevel]
        //d=0,r=1,f=2,a=3
        this.state = {
            crimeTitle:"",
            crimeArthor:"",
            crimeDate:"",
            crimeDescription:"",
            crimeVote: 0,
            severity: 0,
            type:0,
            selectedCrime: false,
            alreadyVote: true,
            alreadyUpVote: false,
            alreadyDownVote: false,
            crimeList: [],
            currentUser: this.props.state.currentUser,

        }
      }
      static getDerivedStateFromProps(props, state) {
        if (props.state.currentUser.id !== state.currentUser.id) {
          return {
            currentUser: props.state.currentUser,
          };
        }
        return null;
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
                        severity:crime.SEVERITY,
                        type: crime.TYPE,
                        alreadyVote: false,
                        alreadyUpVote: false,
                        alreadyDownVote: false
        })
        if (this.state.currentUser.id > 0) {
          if (this.state.currentUser.upvote.some(item => crime.CRIME_ID === item.CRIME_ID)) {
            this.setState({alreadyUpVote: true});
            this.setState({alreadyVote: true});
          }
          if (this.state.currentUser.downvote.some(item => crime.CRIME_ID === item.CRIME_ID)) {
            this.setState({alreadyDownVote: true});
            this.setState({alreadyVote: true});
          }
        };

      }
      myCallback = (dataFromChild) => {
          const crimeNum = this.state.selectedCrime - 1;
          const voteNum = this.state.crimeVote;
          const newArr = [...this.state.crimeList];

          const votedCrime = {
            "CRIME_ID": crimeNum + 1
          }

          if (dataFromChild > 0) {
              this.setState({crimeVote: this.state.crimeVote + 1});
              newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum + 1};
              this.setState({crimeList:newArr}, function () {
                console.log(this.state.crimeList);

              });
              this.state.currentUser.upvote.push(votedCrime);
              this.setState({alreadyUpVote: true});
              this.setState({alreadyVote: true});
              }
          else if (dataFromChild < 0) {
            if (this.state.alreadyUpVote) {
              const filteredUpvote = this.state.currentUser.upvote.filter(s => {
                return s.CRIME_ID !== crimeNum + 1;
              });
              this.setState({currentUser: {... this.state.currentUser, upvote: filteredUpvote,},}, function () {
                console.log(this.state.currentUser.upvote);
                console.log(this.state.currentUser);
              });
              this.setState({crimeVote: this.state.crimeVote - 1});
              newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum - 1};
              this.setState({crimeList:newArr});
              this.setState({alreadyUpVote: false});
              this.setState({alreadyVote: false});
            }
            else if (this.state.alreadyDownVote) {
              const filteredDownvote = this.state.currentUser.downvote.filter(s => {
                return s.CRIME_ID !== crimeNum + 1;
              });
              this.setState({currentUser: {... this.state.currentUser, downvote: filteredDownvote,},}, function () {
                console.log(this.state.currentUser.downvote);
                console.log(this.state.currentUser);
              });
              this.setState({crimeVote: this.state.crimeVote + 1});
              newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum + 1};
              this.setState({crimeList:newArr});
              this.setState({alreadyUpVote: false});
              this.setState({alreadyVote: false});

            }
          }
          else {
              this.setState({crimeVote: this.state.crimeVote - 1});
              newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum - 1};
              this.setState({crimeList:newArr});
              this.state.currentUser.downvote.push(votedCrime);
              this.setState({alreadyDownVote: true});
              this.setState({alreadyVote: true});
              }
          console.log(this.state.currentUser);
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
            icon={{url: this.eventType[crime.TYPE][crime.SEVERITY],  scaledSize: new this.props.google.maps.Size(40, 35)}}
            onClick={() => this.dispalyCrime(crime)}
            />



    ))}

                <CrimeDisplay crimeTitle={this.state.crimeTitle}
                            crimeArthor={this.state.crimeArthor}
                            crimeDate={this.state.crimeDate}
                            crimeDescription={this.state.crimeDescription}
                            crimeVote={this.state.crimeVote}
                            severity={this.state.severity}
                            type={this.state.type}
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
