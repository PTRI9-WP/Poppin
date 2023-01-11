import React, { useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';

function RegisterModal({ setShowReg }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('register button clicked');
  };

    const handleClick = () => {
      setShowReg(false);
    };

  return (
    <>
      <div className='registerModal'>
        <div onClick={handleClick} className='float-right'>
          <AiOutlineCloseCircle size={25} />
        </div>
        <h2 className='modalTitle'>Register</h2>
        <form onSubmit={handleSubmit} className='regForm'>
          <input
            className='inputBox'
            type='email'
            id='email'
            name='email'
            placeholder='email'
            required={true}
            onChange={onChange}
          />
          <input
            className='inputBox'
            type='password'
            id='password'
            name='password'
            placeholder='password'
            required={true}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className='inputBox'
            type='password'
            id='password2'
            name='password2'
            placeholder='confirm password'
            required={true}
            onChange={onChange}
          />
          <button className='stdButton' type='submit'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterModal;
