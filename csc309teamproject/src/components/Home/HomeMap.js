import React, { useState } from "react";
import { GoogleMap, withScriptjs, withGoogleMap, Marker, InfoWindow } from "react-google-maps";
import * as crimeData from "../../data/crimeData.json"
function Map() {

  const [selectedCrime, setSelectedCrime] = useState(null);

  return (
    <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat:43.6629, lng: -79.3957}} // location of UofT
    >
    {crimeData.crimeList.map(crime => ( // List of all crimes
      <Marker 
        key={crime.properties.CRIME_ID} 
        position={{
          lat: crime.geometry.coordinates[1],
          lng: crime.geometry.coordinates[0]
        }}
        onClick={() => {
          setSelectedCrime(crime);
        }}
        />
    ))}
    {selectedCrime && ( //if a crime is selected
        <InfoWindow
          position={{
            lat: selectedCrime.geometry.coordinates[1],
            lng: selectedCrime.geometry.coordinates[0]
          }}
          onCloseClick={() => {
            setSelectedCrime(null);
          }}
        >
          <div> //display
            <h2>{selectedCrime.properties.TITLE}</h2>
            <p> posted by: {selectedCrime.properties.ARTHOR}</p>
            <h4>{selectedCrime.properties.DESCRIPTION}</h4>
          </div>
        </InfoWindow>
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