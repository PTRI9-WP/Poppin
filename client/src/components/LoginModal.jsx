import React, { useEffect, useState } from 'react';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

const LoginModal = ({ setShowLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  //used to dispatch actions
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //grab state from redux
  const { user, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  useEffect(() => {
    if (isError) {
      console.log(message);
      window.alert(message);
    }
    if (isSuccess || user) {
      navigate('/home');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    dispatch(login(userData));
  };

  const handleClick = () => {
    setShowLogin(false);
  };

  return (
    <div className='authPrompt'>
      <div onClick={handleClick}>
        <AiOutlineCloseCircle />
      </div>
      <h2>Login</h2>
      <form onSubmit={onSubmit}>
        <input
          autocomplete='off'
          type='email'
          id='email'
          name='email'
          value={email}
          placeholder=' Type Your Email'
          required={true}
          onChange={onChange}
        />
        <input
          autocomplete='off'
          type='password'
          id='password'
          name='password'
          placeholder='Type Your Password'
          value={password}
          required={true}
          onChange={onChange}
        />
        <button type='submit' className='button'>Login</button>
      </form>
    </div>
  );
};

export default LoginModal;
