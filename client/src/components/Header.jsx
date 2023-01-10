import React, { useState } from 'react';
import corkWhite from '../assets/images/corkWhite.png';
import { Link } from 'react-router-dom';
import {FaTwitter, FaFacebook, FaInstagram} from 'react-icons/fa';

const Header = ({ setShowLogin, setShowReg }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);

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
    console.log('logged out');
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  const handleCheckin = () => {
    console.log('nav to the checkin page');
    window.location.href = '/checkin';
  };

    const handleHome = () => {
      console.log('nav to the checkin page');
      window.location.href = '/home';
    };

  return (
    <nav className='nav'>
      <div className='logoName'>
        <img src={corkWhite} alt='corks' className='navLogo' />
        <h1 className='title'>Poppin'</h1>
      </div>
      <ul className='menu'>
        {isLoggedIn ? (
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
            <Link to='/home'> temp link to dashboard </Link>
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
