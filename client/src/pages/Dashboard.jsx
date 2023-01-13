import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import { Link, useNavigate } from 'react-router-dom';
import CardContainer from '../components/BusinessCardContainer';
import CheckIn_OutModal from '../components/CheckIn_OutModal';
import corkMarker from '../assets/images/corkMarker';
import {
  MarkerF,
  GoogleMap,
  useJsApiLoader,
  StandaloneSearchBox
} from '@react-google-maps/api';
import { useSelector } from 'react-redux';

import axios from 'axios';

const Dashboard = () => {
  //intialize state for map and searchbox
  //state is mainly to reference map and searchbox components so we can use methods under the hood
  const [map, setMap] = useState(null);
  const [searchBox, setSearchBox] = useState(null);
  const [location, setLocation] = useState(null);
  const [markers, setMarkers] = useState(null);

  const { user } = useSelector((state) => state.auth);
  //show modal for entering checkin code
  const [showCheckinModal, setShowCheckinModal] = useState(false);
  const navigate = useNavigate();

  //Upon rendering, ensure that the map loads with the client's location
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  //when user is falsey and routes aren't protected, temp link to dashboard will redirect to landing page
  useEffect(() => {
    if (!user) {
      console.log('user', user);
      navigate('/');
    }
  }, [user]);

  //determine if loaded or not
  //useJsApiLoader will leverage the api loader from google to make the request to the API
  //don't use loadscript if using useJSApiLoader
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: 'AIzaSyDzT6YYS0tMZIKZCDuv5L566AY5rlZlzpU',
    libraries: ['places'],
  });

  //This is required otheriwse, map won't render
  const containerStyle = {
    width: '100%',
    height: '400px',
  };

  const getAllCoordinates = async () => {
    try {
      const allBusinesses = await axios.get('http://localhost:8080/businesses');
      const latLongArr = allBusinesses.data.businesses.map((element) => {
        return {
          lat: parseFloat(element.latitude),
          lng: parseFloat(element.longitude),
          id: element.id,
        };
      });
      return latLongArr;
    } catch (error) {
      console.log(error);
    }
  };

  const createMarkers = async () => {
    const coordinatesArr = await getAllCoordinates();
    const markersArr = coordinatesArr.map((element) => {
      return (
        <MarkerF
          position={{ lat: element.lat, lng: element.lng }}
          animation={2}
          key={element.id}
          icon={{
            url: corkMarker,
            scaledSize: new google.maps.Size(40,40)
          }}
        />
      );
    });
    return markersArr;
  };

  //Move the map to the query location provided in the searchbox
  const onPlacesChanged = async () => {
    const places = await searchBox.getPlaces();
    const bounds = new google.maps.LatLngBounds();

    bounds.union(places[0].geometry.viewport);
    map.fitBounds(bounds);
    setMarkers(await createMarkers());
  };

  //set the reference object to the searchbox state upon the searchbox component rendering
  const onSBLoad = (ref) => {
    setSearchBox(ref);
  };

  //set the reference object to the map state upon the GoogleMap component rendering
  const onMapLoad = (ref) => {
    setMap(ref);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('zip code submitted');
  };

  // removed current location button since it's not imperative for an MVP
  // const handleCurrentLoc = (e) => {
  //   e.preventDefault();
  //   console.log('current location requested');
  // };

  return isLoaded ? (
    <>
      <div className={showCheckinModal ? 'overlay' : null}>
        <Header />

        <main className="dashboardMain">
          {' '}
          {/*  max width 1100px margin 0 auto */}
          {/* User Location form section */}
          <div className="locationForm">
            <h3 className="modalTitle">Select a location:</h3>
            {/* removed current location button since it's not imperative for an
          MVP
          <form onSubmit={handleCurrentLoc}>
            <button className='stdButton' type='submit'>
            </button>
          </form>
          <h3>OR</h3> */}
            <StandaloneSearchBox
              onLoad={onSBLoad}
              onPlacesChanged={onPlacesChanged}
            >
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  placeholder="Zip Code"
                  className="ml-4 mr-4"
                />
                {/* Deactivated since selecting on map is submitting */}
                {/* <button className='stdButton' type='submit'>
                  Submit
                </button> */}
              </form>
            </StandaloneSearchBox>
          </div>
          {/* End User Form Section */}
          {/* Map section */}
          <div className="map">
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={location}
                zoom={10}
                onLoad={onMapLoad}
              >
                {markers}
              </GoogleMap>
          </div>
          {/* End Map section */}
          {/* pic - <address / phone > <poppin score/ incentive>  <checkin>*/}
          <CardContainer setShowCheckinModal={setShowCheckinModal} />
        </main>
      </div>
      {showCheckinModal ? (
        <CheckIn_OutModal setShowCheckinModal={setShowCheckinModal} />
      ) : null}
    </>
  ) : (
    ''
  );
};

export default React.memo(Dashboard);
