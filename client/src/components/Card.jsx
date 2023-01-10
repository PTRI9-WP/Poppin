import React, {useState} from 'react';
import { GiChampagneCork } from 'react-icons/gi';

const Card = () => {
   
  const [ checkin, setCheckin ] = useState(false);

  const handleCheckin = (e) =>{
    e.preventDefault();
    setCheckin(!checkin)
  }

  return (
    <>
      {/* <div className = 'cardContainer'></div> */}
      <div className='dashCard'>
        <div className='info1'>
          <img src='#' alt='img' />
          <div>place name here </div>
        </div>
        <div className='info2'>
          <div>Adress here</div>
          <div>Phone number here</div>
        </div>
        <div className='info3'>
          <div>Poppin Score</div>
          <div className='corkScore'>
            <GiChampagneCork />
            <GiChampagneCork />
            <GiChampagneCork />
            <GiChampagneCork />
            <GiChampagneCork />
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
}

export default Card