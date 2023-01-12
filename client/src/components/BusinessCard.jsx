import React, { useState } from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';

const BusinessCard = ({ businessCard }) => {
  const dispatch = useDispatch();
  const [checkin, setCheckin] = useState(false);

  const handleCheckin = (e) => {
    e.preventDefault();
    setCheckin(!checkin);
  };

  return (
    <>
      {/* <div className = 'cardContainer'></div> */}
      <div className="dashCard">
        <div className="info1">
          <img src="#" alt="img" />
          {/* make sure to option chain (?), since this will be undefined until data is actually fetched. if no option chain, app will crash at run time instead of just temporarily returning undefined while data is fetching */}
          <div>{businessCard?.businessname}</div>
        </div>
        <div className="info2">
          {/* location in business model */}
          <div>Address here</div>
          <div>Phone number here</div>
        </div>
        <div className="info3">
          <div>Poppin Score</div>
          <div className="corkScore">
            <GiChampagneCork color="#2d3b46" />
            <GiChampagneCork color="#2d3b46" />
            <GiChampagneCork color="#2d3b46" />
            <GiChampagneCork color="#f1c9ba" />
            <GiChampagneCork color="#f1c9ba" />
          </div>
          
          <div>incentive goes here</div>
        </div>
        {checkin ? (
          <button className="checkinButton" onClick={handleCheckin}>
            Check In
          </button>
        ) : (
          <button className="attButton" onClick={handleCheckin}>
            Check Out
          </button>
        )}
      </div>
    </>
  );
};

export default BusinessCard;
