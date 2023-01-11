import React, { useEffect } from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
// import Card from '../components/Card';
import CardContainer from '../components/CardContainer';
import Map from '../components/Maps';
import { useSelector, useDispatch } from 'react-redux';
import { getAllBusinesses, reset } from '../features/businesses/businessSlice';

const Dashboard = () => {
  const { businesses } = useSelector((state) => state.business);
  console.log(businesses, 'businesses!');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('zip code submitted');
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllBusinesses());
  }, [dispatch]);

  // removed current location button since it's not imperative for an MVP
  // const handleCurrentLoc = (e) => {
  //   e.preventDefault();
  //   console.log('current location requested');
  // };

  const businessDivs = [];

  businesses.map((business, i) => {
    businessDivs.push(<div key={i}>{business.location}</div>);
  });

  console.log(businessDivs, 'businessdivs');

  return (
    <>
      <Header />
      {/* {businesses.map((el) => {
        return <div>{el?.latitude}</div>;
      })} */}

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
        {/* <div>
          {businesses.map((el, i) => (
            <div key={i}> {el?.location}</div>
          ))}
        </div> */}
        <div>{businessDivs}</div>
      </main>
    </>
  );
};

export default Dashboard;
