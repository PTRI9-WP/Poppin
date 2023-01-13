import React, { useState } from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useSelector, useDispatch } from 'react-redux';

const CheckinDetails = () => {

  const { setSelectedBusiness, selectedBusiness } = useSelector(
    (state) => state.businesses
  );

  const dispatch = useDispatch();
  const handleCheckOut = (e) => {
    e.preventDefault();
    dispatch(setSelectedBusiness(null));
    consosole.log('checked out!');
  };

  //below, data needs to be mapped to multiple cards and rendered for each card checked in
  return (
    <>
      {!selectedBusiness ? (
        <h3 className="modalTitle mt-72">
          You are not currently checked in anywhere...
        </h3>
      ) : (
        <div className="checkinDetail">
          <h3 className="modalTitle">Your Current Checkin Details</h3>
          <div className="info1">
            <img src={selectedBusiness?.image} alt="img" />
            <div>{selectedBusiness?.businessname} </div>
          </div>
          <div className="info2">
            <div>City: {selectedBusiness?.location} </div>
            <div>Phone Number: {selectedBusiness?.phonenumber}</div>
          </div>
          <div className="info3">
            <div>Poppin Score: {selectedBusiness?.poppinscore}</div>
            <div className="corkScore">
              <GiChampagneCork />
              <GiChampagneCork />
              <GiChampagneCork />
              <GiChampagneCork />
              <GiChampagneCork />
            </div>
            <div>Deal: {selectedBusiness?.incentive}</div>
          </div>
          <button className="attButton" onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      )}
    </>
  );
};

export default CheckinDetails;
