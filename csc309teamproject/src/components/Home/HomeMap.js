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

import specialDisease from "../../images/disease-special.png"
import specialRobbery from "../../images/robbery-special.png"
import specialFire from "../../images/fire-special.png"
import specialAssualt from "../../images/assualt-special.png"

class HomeMap extends Component {
    constructor(props) {
        super(props);
        this.dispalyCrime = this.dispalyCrime.bind(this);
        this.diseaseLevel = [diseaseGreen, diseaseYellow, diseaseOrange, diseaseRed];
        this.robberyLevel = [robberyGreen, robberyYellow, robberyOrange, robberyRed];
        this.fireLevel = [fireGreen, fireYellow, fireOrange, fireRed];
        this.assualtLevel = [assualtGreen, assualtYellow, assualtOrange, assualtRed];
        this.specialType = [specialDisease, specialRobbery, specialFire, specialAssualt];
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
            special: false,
            selectedCrime: false,
            crimeItself: null,
            alreadyVote: true,
            alreadyUpVote: false,
            alreadyDownVote: false,
            crimeList: [],
            currentUser: this.props.state.currentUser,
            filter:this.props.state.filter

        }
      }
      static getDerivedStateFromProps(props, state) {
        if (props.state.currentUser._id !== state.currentUser._id) {
          return {
            currentUser: props.state.currentUser,
          };
        }
        return null;
      }
      componentDidMount = () => {
        // [*] Exchanging data with external source
          this.props.actions.getEvents(-1, -1).then((ret) => {
            this.setState({ crimeList: ret.events });
          });
      }
      dispalyCrime = (crime) => {
        this.props.actions.getDisplayName(crime.author).then((ret)=> {
          // console.log(ret)
          this.setState({crimeArthor: ret.displayName})
        })
          this.setState({selectedCrime: crime._id,
                        crimeItself:crime,
                        crimeTitle: crime.title,
                        // crimeArthor: crime.author,
                        crimeDate: crime.date,
                        crimeDescription:crime.description,
                        crimeVote:crime.vote,
                        severity:crime.severity,
                        type: crime.type,
                        special: crime.special,
                        alreadyVote: false,
                        alreadyUpVote: false,
                        alreadyDownVote: false
        })
        if (this.state.currentUser._id !== -1) {

          let upvotePosition = -1;
          for (let index = 0; index < this.state.currentUser.upvote.length; index++) {
            if(this.state.currentUser.upvote[index]._id === crime._id) {
              upvotePosition = index
            }
          }
          // console.log(upvotePosition)
          if (upvotePosition >= 0) {
            this.setState({alreadyUpVote: true});
            this.setState({alreadyVote: true});
          }

          let downvotePosition = -1;
          for (let index = 0; index < this.state.currentUser.downvote.length; index++) {
            if(this.state.currentUser.downvote[index]._id === crime._id) {
              downvotePosition = index
            }
          }
          // console.log(downvotePosition)
          if (downvotePosition >= 0) {
            this.setState({alreadyDownvote: true});
            this.setState({alreadyVote: true});
          }

          let eventsPosition = -1;
          for (let index = 0; index < this.state.currentUser.events.length; index++) {
            if(this.state.currentUser.events[index] === crime._id) {
              eventsPosition = index
            }
          }
          // console.log(eventsPosition)
          if (eventsPosition >= 0) {
            this.setState({alreadyUpVote:false})
            this.setState({alreadyDownVote: false})
            this.setState({alreadyVote:true})
          }
          // if (this.state.currentUser.upvote.some(item => crime._id.str === item._id.str)) {
          //   console.log("upvote")
          //   this.setState({alreadyUpVote: true});
          //   this.setState({alreadyVote: true});
          // }
          // if (this.state.currentUser.downvote.some(item => crime._id.str === item._id.str)) {
          //   console.log("downvote")
          //   this.setState({alreadyDownVote: true});
          //   this.setState({alreadyVote: true});
          // }
          // if(this.state.currentUser.events.some(item => crime._id.str === item.str)) {
          //   console.log("self")
          //   this.setState({alreadyUpVote:false})
          //   this.setState({alreadyDownVote: false})
          //   this.setState({alreadyVote:true})
          // }
        };

      }
      myCallback = (dataFromChild) => {
          // const crimeNum = this.state.selectedCrime - 1;
          // const voteNum = this.state.crimeVote;
          // const newArr = [...this.state.crimeList];

          const votedCrime = {
            "_id": this.state.selectedCrime
          }
          let flag = null
          if (dataFromChild > 0) {
              this.setState({crimeVote: this.state.crimeVote + 1});
              // newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum + 1};
              // this.setState({crimeList:newArr}, function () {
              //   console.log(this.state.crimeList);

              // });
              this.state.currentUser.upvote.push(votedCrime);
              this.setState({alreadyUpVote: true});
              this.setState({alreadyVote: true});
              }
          else if (dataFromChild < 0) {
            if (this.state.alreadyUpVote) {
              flag = 1
              const filteredUpvote = this.state.currentUser.upvote.filter(s => {
                return s._id !== this.state.selectedCrime;
              });
              this.setState({currentUser: {... this.state.currentUser, upvote: filteredUpvote,},}, function () {
                // console.log(this.state.currentUser.upvote);
                // console.log(this.state.currentUser);
              });
              this.setState({crimeVote: this.state.crimeVote - 1});
              // newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum - 1};
              // this.setState({crimeList:newArr});
              this.setState({alreadyUpVote: false});
              this.setState({alreadyVote: false});
            }
            else if (this.state.alreadyDownVote) {
              flag = 0
              const filteredDownvote = this.state.currentUser.downvote.filter(s => {
                return s._id !== this.state.selectedCrime;
              });
              this.setState({currentUser: {... this.state.currentUser, downvote: filteredDownvote,},}, function () {
                // console.log(this.state.currentUser.downvote);
                // console.log(this.state.currentUser);
              });
              this.setState({crimeVote: this.state.crimeVote + 1});
              // newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum + 1};
              // this.setState({crimeList:newArr});
              this.setState({alreadyUpVote: false});
              this.setState({alreadyVote: false});

            }
          }
          else {
              this.setState({crimeVote: this.state.crimeVote - 1});
              // newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum - 1};
              // this.setState({crimeList:newArr});
              this.state.currentUser.downvote.push(votedCrime);
              this.setState({alreadyDownVote: true});
              this.setState({alreadyVote: true});
              }
          this.props.actions.changeVote(this.state.crimeItself._id, dataFromChild, this.state.currentUser, flag).then((success)=> {
            if (success === true) {
              this.componentDidMount()
          }
          })
          // console.log(this.state.currentUser);
      }


    render() {
        return (
            <div className="mapContainer">
               <Map
              google={this.props.google}
              zoom={15}
              initialCenter={{ lat:43.6629, lng: -79.3957}}
            >
            {this.state.crimeList.map((crime) => { // List of all crimes
              if((this.state.filter === crime.type) || (this.state.filter === null)) {
                return <Marker key={crime._id}
                        position={{
                        lat: crime.coordinates[1],
                        lng: crime.coordinates[0]
                        }}
                        icon={crime.special === true?{url: this.specialType[crime.type],  scaledSize: new this.props.google.maps.Size(40, 35)}:
                        {url: this.eventType[crime.type][crime.severity],  scaledSize: new this.props.google.maps.Size(40, 35)}}
                        onClick={() => this.dispalyCrime(crime)}
                        />
              }
              return;
             })

    }

                <CrimeDisplay key={this.state.voteNum}crimeTitle={this.state.crimeTitle}
                            crimeArthor={this.state.crimeArthor}
                            crimeDate={this.state.crimeDate}
                            crimeDescription={this.state.crimeDescription}
                            crimeVote={this.state.crimeVote}
                            severity={this.state.severity}
                            type={this.state.type}
                            alreadyVote={this.state.alreadyVote}
                            callbackFromParent = {this.myCallback}
                            currentUserId = {this.state.currentUser._id}
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
