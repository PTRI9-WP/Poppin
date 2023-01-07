import React, { useState } from 'react';

const LoginModal = ({ setShowLogin}) => {
  const [formData, setFormData] = useState({
    email:'',
    password:'',
  })

  const onChange = (e) => {
    setFormData((prev)=>({
      ...prev,
      [e.target.name]:e.target.value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('login button clicked');
  };

  const handleClick = ()=> {
    setShowLogin(false);
  }

  return (
    <div className='loginModal'>
      <div onClick={handleClick} className='close-icon'>
        X
      </div>
      <h2 className='modalTitle'>Login</h2>
      <form onSubmit={handleSubmit} className='logForm'>
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
          onChange={onChange}
        />
        <button className='stdButton' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
};

export default LoginModal;
