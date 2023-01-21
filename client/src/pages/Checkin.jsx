import React from 'react';
import CheckinDetails from '../components/CheckinDetails';
import Header from '../components/Header';

//Click on button in header to take you to this page. this page will display your current check in. functionality to check out also goes here
const Checkin = () => {
  return (
    <>
      <div>
        <Header />
        <div>
          <CheckinDetails />
        </div>
      </div>
    </>
  );
};

export default Checkin;
