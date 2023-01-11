import React from 'react';
import Header from '../components/Header';
import CheckinDetails from '../components/CheckinDetails';

//Click on button in header to take you to this page. this page will display your current check in. functionality to check out also goes here
const Checkin = () => {
  return (
    <>
      <Header />

      <div className='absolute w-[100%] h-96'>
        
        <CheckinDetails />
      </div>
    </>
  );
};

export default Checkin;
