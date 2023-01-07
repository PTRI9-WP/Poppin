import React from 'react';
import corkWhite from '../assets/images/corkWhite.png';

const Header = () => {
  return (
      <nav className='nav'>
        <div className='logoName'>
          <img src={corkWhite} alt='corks' className='navLogo' />
          <h1 className='title'>Poppin'</h1>
        </div>
        <ul className='menu'>
          <li>Login</li>
          <li>Register</li>
        </ul>
      </nav>
  );
};

export default Header;
