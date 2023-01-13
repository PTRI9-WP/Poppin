import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  checkCode,
  getAllBusinesses,
  updateBusiness,
} from '../features/businesses/businessSlice';

import { setCheckedIn } from '../features/auth/authSlice';
const CheckIn_OutModal = ({ setShowCheckinModal }) => {
  const { selectedBusiness, message } = useSelector(
    (state) => state.businesses
  );
  const { checkedIn } = useSelector((state) => state.auth);

  const [code, setCode] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('button clicked');
    try {
      const response = await dispatch(
        checkCode({ id: selectedBusiness.id, code: code })
      );
      console.log('RESPONSE ==>', response);
      if (response.payload.message === 'Code matched, new code generated') {
        dispatch(setCheckedIn(true));
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
        setShowCheckinModal(false);
      } else {
        console.log('message', message);
        window.alert('code does not match');
      }
    } catch (error) {
      console.log(error);
      window.alert(error);
    }
  };

  const handleClick = () => {
    setShowCheckinModal(false);
  };

  const handleCheckin = (e) => {
    e.preventDefault();
  };

  return (
    <div className='checkIn_OutModal'>
      <div onClick={handleClick} className='float-right'>
        <AiOutlineCloseCircle size={25} />
      </div>
      <h2 className='modalTitle mt-5'>Ask Your Server For A Code:</h2>
      <form onSubmit={handleSubmit} className='codeForm'>
        <input
          className='inputBox mb-11'
          type='text'
          id='code'
          name='code'
          placeholder='code'
          required={true}
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />
        {!checkedIn ? (
          <button type='submit' className='checkinButton'>
            Check In
          </button>
        ) : (
          <button type='submit' className='attButton'>
            Check Out
          </button>
        )}
      </form>
    </div>
  );
};

export default CheckIn_OutModal;
