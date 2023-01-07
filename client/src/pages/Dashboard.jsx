import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom'
// import Card from '../components/Card';
import CardContainer from '../components/CardContainer';

const Dashboard = () => {

const handleSubmit = (e) => {
  e.preventDefault();
  console.log('zip code submitted');
};

const handleCurrentLoc = (e) => {
  e.preventDefault();
  console.log('current location requested');
};

  return (
    <>
      <Header>
        <Link to='/'> temp link to landing page </Link>
      </Header>
      <main className='flex flex-col max-w-[60%] mx-auto'>
        {' '}
        {/*  max width 1100px margin 0 auto */}
        {/* User Location form section */}
        <div className='locationForm'>
          <h3>Select a location:</h3>
          <form onSubmit={handleCurrentLoc}>
            <button className='stdButton' type='submit'>
              Current Location
            </button>
          </form>

          <h3>OR</h3>
          <form onSubmit={handleSubmit}>
            <input type='text' placeholder='Zip Code' />
            <button className='stdButton' type='submit'>
              Submit
            </button>
          </form>
        </div>
        {/* End User Form Section */}
        <div className='border-2 border-sky-500 py-52 mb-14'>map go here</div>
        {/* pic - <address / phone > <poppin score/ incentive>  <checkin>*/}
        <CardContainer />
      </main>
    </>
  );
};

export default Dashboard;
