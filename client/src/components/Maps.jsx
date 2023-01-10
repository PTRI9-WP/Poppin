import React from 'react'
import { Marker, GoogleMap, useJsApiLoader } from '@react-google-maps/api';

//Component for Google Map
function Map() {
  //determine if loaded or not
  //useJsApiLoader will leverage the api loader from google to make the request to the API
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDzT6YYS0tMZIKZCDuv5L566AY5rlZlzpU"
  })

  //This is required otheriwse, map won't render
  const containerStyle = {
    width: '100%',
    height: '400px',
  };
  
  //Determines the center of the map
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  
  return isLoaded ? (
    // mapContainerStyle needs to be specified and not style to render the map
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={10}
      >
        { /* Child components, such as markers, info windows, etc. */ }
        <Marker 
          position={center}
        />
      </GoogleMap>
  ) : <></>
}

export default React.memo(Map)