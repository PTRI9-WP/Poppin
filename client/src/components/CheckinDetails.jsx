import React from 'react';
import { GiChampagneCork } from 'react-icons/gi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setCheckedIn } from '../features/auth/authSlice';
import { setSelectedBusiness } from '../features/businesses/businessSlice';
const CheckinDetails = () => {
  const navigate = useNavigate();
  const { selectedBusiness } = useSelector((state) => state.businesses);

  const { checkedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const handleCheckOut = (e) => {
    e.preventDefault();
    dispatch(setSelectedBusiness(null));
    dispatch(setCheckedIn(false));
    console.log('checked out!');
    navigate('/home');
  };

  //below, data needs to be mapped to multiple cards and rendered for each card checked in
  return (
    <>
      {!checkedIn ? (
        <h3 className='modalTitle mt-72'>
          You are not currently checked in anywhere...
        </h3>
      ) : (
        <div className='checkinDetail'>
          <h3 className='modalTitle'>Your Current Checkin Details</h3>
          <div className='info1'>
            <img src={selectedBusiness?.image} alt='img' />
            <div>{selectedBusiness?.businessname} </div>
          </div>
          <div className='info2'>
            <div>City: {selectedBusiness?.location} </div>
            <div>Phone Number: {selectedBusiness?.phonenumber}</div>
          </div>
          <div className='info3'>
            <div>Poppin Score: {selectedBusiness?.poppinscore}</div>
            <div className='corkScore'>
              <GiChampagneCork
                color={
                  selectedBusiness?.poppinscore >= 20 ? '#2d3b46' : '#f1c9ba'
                }
              />
              <GiChampagneCork
                color={
                  selectedBusiness?.poppinscore >= 40 ? '#2d3b46' : '#f1c9ba'
                }
              />
              <GiChampagneCork
                color={
                  selectedBusiness?.poppinscore >= 60 ? '#2d3b46' : '#f1c9ba'
                }
              />
              <GiChampagneCork
                color={
                  selectedBusiness?.poppinscore >= 80 ? '#2d3b46' : '#f1c9ba'
                }
              />
              <GiChampagneCork
                color={
                  selectedBusiness?.poppinscore >= 100 ? '#2d3b46' : '#f1c9ba'
                }
              />
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
