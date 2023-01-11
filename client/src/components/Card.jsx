import React, { useState } from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';

const Card = ({ card }) => {
  const dispatch = useDispatch();
  const [checkin, setCheckin] = useState(false);

  const handleCheckin = (e) => {
    e.preventDefault();
    setCheckin(!checkin);
  };

  return (
    <>
      {/* <div className = 'cardContainer'></div> */}
      <div className='dashCard'>
        <div className='info1'>
          <img src='#' alt='img' />
          <div>{card?.businessname} </div>
        </div>
        <div className='info2'>
          <div>Adress here</div>
          <div>Phone number here</div>
        </div>
        <div className='info3'>
          <div>Poppin Score</div>
          <div className='corkScore'>
            <GiChampagneCork color='#2d3b46' />
            <GiChampagneCork color='#2d3b46' />
            <GiChampagneCork color='#2d3b46' />
            <GiChampagneCork color='#f1c9ba' />
            <GiChampagneCork color='#f1c9ba' />
          </div>
          <div>incentive goes here</div>
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

export default Card;
