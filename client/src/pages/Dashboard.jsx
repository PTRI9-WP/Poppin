import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
// import Card from '../components/Card';
import CardContainer from '../components/CardContainer';
import Map from '../components/Maps';

const Dashboard = () => {
  const { businesses } = useSelector((state) => state.businesses);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('zip code submitted');
  };

  // removed current location button since it's not imperative for an MVP
  // const handleCurrentLoc = (e) => {
  //   e.preventDefault();
  //   console.log('current location requested');
  // };

  return (
    <>
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
              Current
            </button>
          </form>
          <h3>OR</h3> */}
          <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Zip Code" className="ml-4 mr-4" />
            <button className="stdButton" type="submit">
              Submit
            </button>
          </form>
        </div>
        {/* End User Form Section */}
        {/* Map section */}
        <div className="map">
          <Map />
        </div>
        {/* End Map section */}
        {/* pic - <address / phone > <poppin score/ incentive>  <checkin>*/}
        <CardContainer />
      </main>
    </>
  );
};

export default Dashboard;
