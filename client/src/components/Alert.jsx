import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

const Alert = () => {

  return (
    <div className='badAlert'>
      <div onClick={handleClick} className='float-right'>
        <AiOutlineCloseCircle size={25} />
      </div>
      <h2 className='modalTitle'>Invalid Code</h2>

    </div>
  );
};

export default Alert;
