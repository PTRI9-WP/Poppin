import React from 'react';
import corkWhite from '../assets/images/corkWhite.png';

const Header = () => {
  return (
    <>
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
      <div className='info'>
        <ul className='promo'>
          <li>
            <h2>Hate Crowds?</h2>
            <p>Find a great deal while being in a more intimate setting.</p>
          </li>
          <li>
            <h2>Find The Right Party!</h2>
            <p>With Poppin's proprietary crowd monitoring technology we'll help you find the livest crowd in town!</p>
          </li>
          <li>
            <h2>Can't Get Enough People In The Door?</h2>
            <p>Poppin will help people see your incetives and markeing efforts to get them in the door.</p>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Header;
