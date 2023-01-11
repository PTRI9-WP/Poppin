import React, {useState} from 'react';
import { GiChampagneCork } from 'react-icons/gi';

const CheckinDetails = () => {

  const [checkin, setCheckin] = useState(false);

  const handleCheckOut = (e) => {
    e.preventDefault();
    consosole.log('checked out!')
  };

  return (
    <>
      {checkin ? (
        <h3 className='modalTitle mt-72'>
          You are not currently checked in anywhere...
        </h3>
      ) : (
        <div className='checkinDetail'>
          <h3 className='modalTitle'>Your Current Checkin Details</h3>
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
          <button className='attButton' onClick={handleCheckOut}>
            Check Out
          </button>
        </div>
      )}
    </>
  );
};

export default CheckinDetails;