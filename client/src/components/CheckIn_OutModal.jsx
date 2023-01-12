import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const CheckIn_OutModal = ({ setShowCheckinModal }) => {
  //NEED CHECKIN/OUT STATE

  const [code, setCode] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('CheckIn_OutModal Button');
  };

  const handleClick = () => {
    setShowCheckinModal(false);
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
        <button className='stdButton' type='submit'>
          CHECK...
        </button>
      </form>
    </div>
  );
};

export default CheckIn_OutModal;
