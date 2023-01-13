import React from 'react';
import Header from '../components/Header';
import CheckinDetails from '../components/CheckinDetails';
import CheckIn_OutModal from '../components/CheckIn_OutModal';

//Click on button in header to take you to this page. this page will display your current check in. functionality to check out also goes here
const Checkin = () => {

  

  return (
    <>
      <div className='overlay_______'>
        <Header />

        <div className='absolute w-[100%] h-96'>
          <CheckinDetails />
        </div>
      </div>
    </>
  );
};

export default Checkin;
