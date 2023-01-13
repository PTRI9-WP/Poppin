import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useSelector } from 'react-redux';

const CheckIn_OutModal = ({ setShowCheckinModal }) => {
  const { selectedBusiness } = useSelector((state) => state.businesses);
  const [checkin, setCheckin] = useState(false);

  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('CheckIn_OutModal Button');
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
          onChange={(e) => setCode(e.target.value)}
        />
        {checkin ? (
          <button className='checkinButton' onClick={handleCheckin}>
            Check In
          </button>
        ) : (
          <button className='attButton' onClick={handleCheckin}>
            Check Out
          </button>
        )}
      </form>
    </div>
  );
};

export default CheckIn_OutModal;
