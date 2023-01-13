import React, { useState } from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';

import {
  setSelectedBusiness,
  updateBusiness,
  getAllBusinesses,
} from '../features/businesses/businessSlice';

const BusinessCard = ({ businessCard, setShowCheckinModal }) => {
  const dispatch = useDispatch();
  // const [checkin, setCheckin] = useState(true);

  const { selectedBusiness } = useSelector((state) => state.businesses);

  // const handleDivClick = (e) => {
  //   e.preventDefault();
  //   dispatch(setSelectedBusiness(businessCard));
  //   console.log('SELECTED BUSINESS ==> ', selectedBusiness);
  // };
  const handleCheckin = (e) => {
    dispatch(setSelectedBusiness(businessCard));
    dispatch(
      updateBusiness({
        id: selectedBusiness.id,
        currentcapacity: selectedBusiness.currentcapacity,
        poppinscore: selectedBusiness.poppinscore,
      })
    );
    dispatch(getAllBusinesses());
    console.log('CURRENT BUSINESS =>', selectedBusiness);
    console.log('SCORE =>', selectedBusiness?.poppinscore);
    // setCheckin(!checkin);
    setShowCheckinModal(true);
  };

  return (
    <>
      {/* <div className = 'cardContainer'></div> */}
      <div className='dashCard'>
        <div className='info1'>
          <img src={businessCard?.image} alt='img' />
          {/* make sure to option chain (?), since this will be undefined until data is actually fetched. if no option chain, app will crash at run time instead of just temporarily returning undefined while data is fetching */}
          <div>{businessCard?.businessname}</div>
        </div>
        <div className='info2'>
          <div>City: {businessCard?.location}</div>
          <div>Phone Number: {businessCard?.phonenumber}</div>
        </div>
        <div className='info3'>
          {/* the question mark is needed as it AWAITS for the data to populate */}
          <div>Poppin Score {businessCard?.poppinscore}</div>
          <div className='corkScore'>
            <GiChampagneCork
              color={businessCard?.poppinscore >= 20 ? '#2d3b46' : '#f1c9ba'}
            />
            <GiChampagneCork
              color={businessCard?.poppinscore >= 40 ? '#2d3b46' : '#f1c9ba'}
            />
            <GiChampagneCork
              color={businessCard?.poppinscore >= 60 ? '#2d3b46' : '#f1c9ba'}
            />
            <GiChampagneCork
              color={businessCard?.poppinscore >= 80 ? '#2d3b46' : '#f1c9ba'}
            />
            <GiChampagneCork
              color={businessCard?.poppinscore >= 100 ? '#2d3b46' : '#f1c9ba'}
            />
          </div>
          <div>Deal: {businessCard?.incentive}</div>
        </div>

        {/* This need to change only when check in or out is confirmed */}

        {selectedBusiness?.id === businessCard.id ? (
          <button className='checkinButton' onClick={handleCheckin}>
            Check In
          </button>
        ) : (
          <button className='attButton' onClick={handleCheckin}>
            Check Out
          </button>
        )}
      </div>
    </>
  );
};

export default BusinessCard;

//code solution
//a code should exist on the database of the business << when /where is this code made
//when checkin button is pressed, retrieve code from business, console log code
//user takes consolelogged code and enters it into the input
//upon successful input, move code stored in code column into storedcodes column array
//upon succesfful checkout , access array from business table and acccess code column and delete the given user code from the array

//code solution felix
//all the codes are already stored in tobeusedcode column
//when a code is used by a user, move currentcode into storedcodes and pop a tobeusedcode and make it the currentcode

//Jake Solution
//create a state that tracks if a checkin button was pressed and a correct code was entered into the modal
//remove all checkin buttons
//the only way to checkout is to go to the checkin page and click checkout...you can still search for places, but no checkin button will be present

//Jason Solution
//CANNOT CLICK BUTTON IF THERE IS ALREADY A SELECTED BUSINESS
//
