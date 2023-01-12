import React, { useState } from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSelectedBusiness,
  updateBusiness,
} from '../features/businesses/businessSlice';

const BusinessCard = ({ businessCard, setShowCheckinModal }) => {
  const dispatch = useDispatch();
  const [checkin, setCheckin] = useState(false);

  const { selectedBusiness } = useSelector((state) => state.businesses);

  const handleDivClick = (e) => {
    e.preventDefault();
    dispatch(setSelectedBusiness(businessCard));
    console.log('SELECTED BUSINESS ==> ', selectedBusiness);
  };
  const handleCheckin = (e) => {
    dispatch(setSelectedBusiness(businessCard));
    dispatch(
      updateBusiness({
        id: selectedBusiness.id,
        currentcapacity: selectedBusiness.poppinscore + 1,
      })
    );
    console.log('SCORE =>', selectedBusiness?.poppinscore);
    setCheckin(!checkin);
    // setShowCheckinModal(true);
  };

  return (
    <>
      {/* <div className = 'cardContainer'></div> */}
      <div className='dashCard' onClick={handleDivClick}>
        <div className='info1'>
          <img src={businessCard?.image} alt='img' />
          {/* make sure to option chain (?), since this will be undefined until data is actually fetched. if no option chain, app will crash at run time instead of just temporarily returning undefined while data is fetching */}
          <div>{businessCard?.businessname}</div>
        </div>
        <div className='info2'>
          <div>Adress here {businessCard?.location}</div>
          <div>Phone number here {businessCard?.phonenumber}</div>
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
          <div>incentive goes here {businessCard?.incentive}</div>
        </div>
        {checkin ? (
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
