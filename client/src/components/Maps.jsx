import React from 'react'
import { MarkerF, GoogleMap, useJsApiLoader, StandaloneSearchBox, LoadScript } from '@react-google-maps/api';
import { useRef, useState } from 'react';

//Component for Google Map
function Map() {

  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);

  //determine if loaded or not
  //useJsApiLoader will leverage the api loader from google to make the request to the API
  //don't use loadscript if using useJSApiLoader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyDzT6YYS0tMZIKZCDuv5L566AY5rlZlzpU",
    libraries: ['places']
  })

  //This is required otheriwse, map won't render
  const containerStyle = {
    width: '400px',
    height: '400px'
  };
  
  //Determines the center of the map
  const center = {
    lat: -3.745,
    lng: -38.523
  };
  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    console.log('location', places[0].geometry.location);
    console.log('lat', places[0].geometry.location.lat());
    console.log('long', places[0].geometry.location.lng())
    
  };

  const onSBLoad = ref => {
    setSearchBox(ref);
  };

  const onMapLoad = ref => {
    setMap(ref);
  };

  return isLoaded ? (
    // mapContainerStyle needs to be specified and not style to render the map

    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={10}
      onLoad={onMapLoad}
    >
      <MarkerF 
        position={center} />
         
      { /* Child components, such as markers, info windows, etc. */ }
      <StandaloneSearchBox
        onLoad={onSBLoad}
        onPlacesChanged={onPlacesChanged}
      >
        <input 
        type="text"
        placeholder="Customized your placeholder"
        style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        padding: `0 12px`,
        borderRadius: `3px`,
        boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
        fontSize: `14px`,
        outline: `none`,
        textOverflow: `ellipses`,
        position: "absolute",
        left: "50%",
        marginLeft: "-120px"
      }}/>
      </StandaloneSearchBox>
    </GoogleMap>
  ) : <></>
}

export default React.memo(Map)