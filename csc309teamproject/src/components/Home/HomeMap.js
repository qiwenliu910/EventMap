import { Map, GoogleApiWrapper, Marker } from 'google-maps-react';
import React, { Component } from 'react';
import CrimeDisplay from "./CrimeDisplay.js"

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

            crimeList: [
                {
                  
                    "CRIME_ID": 1,
                    "TITLE": "Rabbit is killed",
                    "ADDRESS": "123 UofT St",
                    "ARTHOR": "Qiwen",
                    "DATE":"2020/01/18",
                    "TYPE": "Assualt",
                    "VOTE": 0,
                    "DESCRIPTION": "Qiwen's rabbit is killed.",
                    "coordinates": [-79.3957, 43.662]
                  
                },
               
                {
                 
                    "CRIME_ID": 2,
                    "TITLE": "Laptop stolen",
                    "ADDRESS": "321 MP St",
                    "ARTHOR": "Qiwen",
                    "DATE":"2020/01/19",
                    "TYPE": "Robbery",
                    "VOTE": 0,
                    "DESCRIPTION": "Qiwen's laptop is stolen.",   
                
                    "coordinates": [-79.3959, 43.665]
                  
                },
               
                { 
                  
                    "CRIME_ID": 3,
                    "TITLE": "New COVID-19 Case",
                    "ADDRESS": "123 Bahen St",
                    "ARTHOR": "Qiwen",
                    "DATE":"2020/01/20",
                    "TYPE": "Disease",
                    "VOTE": 0,
                    "DESCRIPTION": "A new COVID-19 case is discovered.",
                  
                    "coordinates": [-79.396, 43.67]
                  
                },
          
                { 
                 
                    "CRIME_ID": 4,
                    "TITLE": "A fire in the building",
                    "ADDRESS": "321 SS Dr",
                    "ARTHOR": "Qiwen",
                    "DATE":"2018/01/21",
                    "TYPE": "Fire",
                    "VOTE": 0,
                    "DESCRIPTION": "A student burned himself.", 
                
                    "coordinates": [-79.391, 43.669]
                  
                }
              ]
        }
      }
      dispalyCrime = (crime) => {
          this.setState({selectedCrime: crime.CRIME_ID,
                        crimeTitle: crime.TITLE,
                        crimeArthor: crime.ARTHOR,
                        crimeDate: crime.DATE,
                        crimeDescription:crime.DESCRIPTION,
                        crimeVote:crime.VOTE
        }); 
        
      }
      myCallback = (dataFromChild) => {
          const crimeNum = this.state.selectedCrime - 1;
          const voteNum = this.state.crimeVote;
          const newArr = [...this.state.crimeList];
          if (dataFromChild) {
              this.setState({crimeVote: this.state.crimeVote + 1});
              newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum + 1};
              this.setState({crimeList:newArr});
              }
            
          else {
              this.setState({crimeVote: this.state.crimeVote - 1});
              newArr[crimeNum] = {...newArr[crimeNum], VOTE: voteNum - 1};
              this.setState({crimeList:newArr});
              
          }
      }

     
    
    render() {
    
        return (
            <div>
               <Map
              google={this.props.google}
              zoom={15}
              style={{ width: "100vw", height: "100vh"}}
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
                            callbackFromParent = {this.myCallback}
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