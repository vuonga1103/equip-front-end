import React from "react";
import GoogleMapReact from "google-map-react";
import "../styling/Map.css";
import LocationPin from "./LocationPin";

const API_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

const Map = ({ user, zoomLevel }) => (
  <div className="map">
    <div className="google-map">
      <GoogleMapReact
        bootstrapURLKeys={{ key: API_KEY }}
        defaultCenter={{ lat: user.latitude, lng: user.longitude }}
        defaultZoom={zoomLevel}
      >
        <LocationPin lat={user.latitude} lng={user.longitude} />
      </GoogleMapReact>
    </div>
  </div>
);

export default Map;
