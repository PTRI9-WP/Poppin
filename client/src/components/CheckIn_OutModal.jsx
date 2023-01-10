import React, { useState } from 'react';

const CheckIn_OutModal = () => {


//NEED CHECKIN/OUT STATE


    const [code, setCode] = useState('');

    const handleSubmit = (e) => {
      e.preventDefault();
      console.log('CheckIn_OutModal Button');
    };

      const handleClick = () => {
        
      };


  return (
    <div className='checkIn_OutModal'>
      <div onClick={handleClick} className='close-icon'>
        X
      </div>
      <h2 className='modalTitle'>RENDER IN OR OUT COND.</h2>
      <form onSubmit={handleSubmit} className='codeForm'>
        <input
          className='inputBox'
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
