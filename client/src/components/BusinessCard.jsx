import React from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';

import { setSelectedBusiness } from '../features/businesses/businessSlice';

const BusinessCard = ({ businessCard, setShowCheckinModal }) => {
  const dispatch = useDispatch();
  const { checkedIn } = useSelector((state) => state.auth);
  const handleBusinessClick = (e) => {
    dispatch(setSelectedBusiness(businessCard));
    setShowCheckinModal(true);
  };

  return (
    <>
      {/* <div className="cardContainer"></div> */}
      <div>
        <div>
          <img
            src={businessCard?.image}
            alt='img'
          />
          {/* make sure to option chain (?), since this will be undefined until data is actually fetched. if no option chain, app will crash at run time instead of just temporarily returning undefined while data is fetching */}
          <div>{businessCard?.businessname}</div>
        </div>
        <div>
          <div>City:</div>
          <div>{businessCard?.location}</div>
          <div> Phone Number: </div>
          <div>{businessCard?.phonenumber}</div>
        </div>
        <div>
          {/* the question mark is needed as it AWAITS for the data to populate */}
          <div>
            <div>Poppin Score:</div>
            <div>
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
          </div>

          <div>Deal: {businessCard?.incentive}</div>
        </div>

        {/* This need to change only when check in or out is confirmed */}
        {!checkedIn ? (
          <button onClick={handleBusinessClick}>
            Check In
          </button>
        ) : (
          // FIX LATER TO : checked in card has checkout button but the rest have no button when checked out
          // <button className='checkinButton' onClick={handleBusinessClick}>
          //   Check out
          // </button>
          <button>
            Already <br /> Checked In
          </button>
        )}
      </div>
    </>
  );
};

export default BusinessCard;
