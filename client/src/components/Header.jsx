import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import corkShotWhite from '../assets/images/corkShotWhite.png';
import { Link, useNavigate } from 'react-router-dom';
import { FaTwitter, FaFacebook, FaInstagram } from 'react-icons/fa';

import { logout, reset } from '../features/auth/authSlice';

const Header = ({ setShowLogin, setShowReg }) => {
  //use selector reads data from the store. these link to the reducer functions
  const { user, isSuccess } = useSelector((state) => state.auth);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //use dispatch dispatch's actions and allows them to be used
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess || user) navigate('/home');

    dispatch(reset());
  }, [isSuccess, user]);

const Header = ({ setShowLogin, setShowReg }) => {
  //use selector reads data from the store. these link to the reducer functions
  const { user } =  useSelector((state)=> state.auth)
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  //use dispatch dispatch's actions and allows them to be used 
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const handleLogin = () => {
    console.log('login clicked');
    setShowReg(false);
    setShowLogin(true);
  };

  const handleReg = () => {
    console.log('registration clicked');
    setShowReg(true);
    setShowLogin(false);
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/');
  };

  const handleCheckin = () => {
    console.log('nav to the checkin page');
    navigate('/checkin')
  };

    const handleHome = () => {
      console.log('nav to dashboard');
      navigate('/home');
    };

  return (
    <nav className='nav'>
      <div className='logoName'>
        <img src={logo} alt='corks' className='navLogo' />
        <h1 className='title'>Poppin'</h1>
      </div>
      <ul className='menu'>
        {user ? (
          <>
            <li>
              <button onClick={handleHome}>Home</button>
            </li>
            <li>
              <button onClick={handleCheckin}>Checkins</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <div className='iconRow'>
              <FaTwitter className='socIcon' />
              <FaFacebook className='socIcon' />
              <FaInstagram className='socIcon' />
            </div>
          </>
        ) : (
          <>
            {/* <Link to='/home'> temp link to dashboard </Link> */}
            <li>
              <button onClick={handleLogin}>Login</button>
            </li>
            <li>
              <button onClick={handleReg}>Register</button>
            </li>
            <div className='iconRow'>
              <FaTwitter className='socIcon' />
              <FaFacebook className='socIcon' />
              <FaInstagram className='socIcon' />
            </div>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
