import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';
import { GiHamburgerMenu } from 'react-icons/gi';
import { logout, reset } from '../features/auth/authSlice';

const Header = ({ setShowLogin, setShowReg }) => {
  //use selector reads data from the store. store is modified by the reducer functions in the slice
  const { user } = useSelector((state) => state.auth);
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
    navigate('/checkin');
  };

  const handleHome = () => {
    console.log('nav to dashboard');
    navigate('/home');
  };

  return (
    <nav className='header'>
      <div className='logo'>
        <img src={logo} alt='corks' />
      </div>

      {/* <div>
          <GiHamburgerMenu color='white' size={30} />
        </div> */}
      <ul>
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
          </>
        )}
      </ul>
    </nav>
  );
};

export default Header;
