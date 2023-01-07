import React from 'react';
import corkWhite from '../assets/images/corkWhite.png';
import { Link } from 'react-router-dom';

const Header = ({ setShowLogin, setShowReg }) => {

  const handleLoginClick = () => {
    console.log('login clicked');
    setShowReg(false);
    setShowLogin(true);
  };

  const handleRegClick = () => {
    console.log('registration clicked');
        setShowReg(true);
        setShowLogin(false);
  };

  return (
    <nav className='navLanding'>
      <div className='logoName'>
        <img src={corkWhite} alt='corks' className='navLogo' />
        <h1 className='title'>Poppin'</h1>
      </div>
      <ul className='menu'>
        <Link to='/home'> temp link to dashboard </Link>
        <li>
          <button onClick={handleLoginClick}>Login</button>
        </li>
        <li>
          <button onClick={handleRegClick}>Register</button>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
