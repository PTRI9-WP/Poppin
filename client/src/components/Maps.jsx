import React from 'react'
import { MarkerF, GoogleMap, useJsApiLoader, StandaloneSearchBox } from '@react-google-maps/api';
import { useState } from 'react';

//Component for Google Map
function Map() {

  //intialize state for map and searchbox
  //state is mainly to reference map and searchbox components so we can use methods under the hood
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
  //This should the user's current location on load
  const center = {
    lat: -3.745,
    lng: -38.523
  };

  //Move the map to the query location provided in the searchbox
  const onPlacesChanged = () => {
    const places = searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    bounds.union(places[0].geometry.viewport);
    map.fitBounds(bounds);
  };

  //set the reference object to the searchbox state upon the searchbox component rendering
  const onSBLoad = ref => {
    setSearchBox(ref);
  };

  //set the reference object to the map state upon the GoogleMap component rendering
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
        placeholder="123 Main St`"
        style={{
        boxSizing: `border-box`,
        border: `1px solid transparent`,
        width: `240px`,
        height: `32px`,
        padding: `0 12px`,
        borderRadius: `8px`,
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