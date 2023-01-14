import React, { useState } from 'react';

const Alert = () => {

  return (
    <div className='w-[100%] h-fit bottom-0 bg-red-400 absolute z-50 animate-bounce'>
      <h2 className='modalTitle'>Invalid Code</h2>
    </div>
  );
};

export default Alert;
