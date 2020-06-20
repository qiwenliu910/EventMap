import React, { useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as crimeData from "../../data/crimeData.json"
import CrimeDisplay from "./CrimeDisplay.js"
function Map() {

  const [selectedCrime, setSelectedCrime] = useState(null);

  return (
    <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat:43.6629, lng: -79.3957}} // location of UofT
    >
    {crimeData.crimeList.map(crime => ( // List of all crimes
      <div key={crime.properties.CRIME_ID}> 
        <Marker 
        position={{
          lat: crime.geometry.coordinates[1],
          lng: crime.geometry.coordinates[0]
        }}
        onClick={() => {
          setSelectedCrime(crime);
        }}
        />
        <CrimeDisplay crimeTitle=""
                        crimeArthor=""
                        crimeDate=""
                        crimeDescription="">
          </CrimeDisplay>
      </div>
      
    ))}
    {selectedCrime && ( //if a crime is selected
        <div key={selectedCrime.properties.CRIME_ID}>
          <CrimeDisplay crimeTitle={selectedCrime.properties.TITLE} 
                        crimeArthor={selectedCrime.properties.ARTHOR}
                        crimeDate={selectedCrime.properties.DATE}
                        crimeDescription={selectedCrime.properties.DESCRIPTION}>
          </CrimeDisplay>
        </div>
      )}
  </GoogleMap>
  );
}

const WrappedMap = withScriptjs(withGoogleMap(Map));

function HomeMap() {
  return (
    <div style={{ width: "100vw", height: "100vh"}}>
      <WrappedMap
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyBI0N2-bySzN31crVqCT0Mww1NifTznJ8g`}
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
  )
}
export default HomeMap