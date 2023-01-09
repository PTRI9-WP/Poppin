import React, { useState } from 'react';
import corkWhite from '../assets/images/corkWhite.png';
import { Link } from 'react-router-dom';

const Header = ({ setShowLogin, setShowReg }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
              <button onClick={handleCheckin}>Checkins</button>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
