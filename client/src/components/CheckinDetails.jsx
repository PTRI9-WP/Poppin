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
      <div>
        {!checkedIn ? (
          <h3>
            You are not currently checked in anywhere...
          </h3>
        ) : (
          <div>
            <h3>Your Current Checkin Details</h3>
            <div>
              <img
                src={selectedBusiness?.image}
                alt='img'
              />
              <div>
                {selectedBusiness?.businessname}{' '}
              </div>
              <div>City: </div>
              <div>{selectedBusiness?.location} </div>
              <div>Phone Number:</div>
              <div>{selectedBusiness?.phonenumber}</div>
              <div>Poppin Score</div>
              <div>
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
            </div>
            <div></div>
            <button onClick={handleCheckOut}>
              Check Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CheckinDetails;
