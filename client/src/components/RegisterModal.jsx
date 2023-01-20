import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../features/auth/authSlice';

function RegisterModal({ setShowReg }) {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
  });

  const { email, password, password2 } = formData;

  const { isError, isSuccess, message, user } = useSelector(
    (state) => state.auth,
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      window.alert(message);
    }
    if (isSuccess || user) {
      navigate('/home');
    }
    dispatch(reset());
  }, [isError, isSuccess, message, user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      window.alert('passwords do not match');
    }
    const userInfo = { email, password };
    dispatch(register(userInfo));
  };

  const handleClick = () => {
    setShowReg(false);
  };

  return (
    <>
      <div className='authPrompt'>
        <div onClick={handleClick}>
          <AiOutlineCloseCircle />
        </div>
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='email'
            required={true}
            onChange={onChange}
          />
          <input
            type='password'
            id='password'
            name='password'
            placeholder='password'
            required={true}
            onChange={onChange}
          />
          <input
            type='password'
            id='password2'
            name='password2'
            placeholder='confirm password'
            required={true}
            onChange={onChange}
          />
          <button type='submit' className='button'>
            Submit
          </button>
        </form>
      </div>
    </>
  );
}

export default RegisterModal;
