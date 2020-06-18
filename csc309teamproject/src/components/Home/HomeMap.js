import React from 'react';
import { GoogleMap, withScriptjs, withGoogleMap } from "react-google-maps";
function Map() {
  return (
    <GoogleMap
    defaultZoom={15}
    defaultCenter={{ lat:43.6629, lng: -79.3957}} // location of UofT
    />

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