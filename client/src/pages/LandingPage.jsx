import React, {useState} from 'react'
import Header from '../components/HeaderLanding'
import { Link } from 'react-router-dom'
import bar from '../assets/images/bar.jpg';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

const LandingPage = () => {
  const [ showLogin, setShowLogin ] = useState(false);
  const [ showReg, setShowReg ] = useState(false);


  return (
    <>
      <div className='top'>
        <img src={bar} alt='bar' className='barPic' />
        <Header
          className='fixed'
          setShowLogin={setShowLogin}
          setShowReg={setShowReg}
        />
      </div>
      
      {showLogin ? <LoginModal setShowLogin={setShowLogin} /> : null}
      {showReg ? <RegisterModal setShowReg={setShowReg} /> : null}

      <div className='info'>
        <ul className='promo'>
          <li>
            <h2>Hate Crowds?</h2>
            <p className='b'>
              Find a great deal while being in a more intimate setting.
            </p>
          </li>
          <li>
            <h2>Love Crowds?</h2>
            <p>
              With Poppin's proprietary crowd monitoring technology we'll help
              you find the livest venue in town!
            </p>
          </li>
          <li>
            <h2>More People!</h2>
            <p>
              Poppin will help people see your incetives and markeing efforts to
              get them in the door.
            </p>
          </li>
        </ul>
      </div>
    </>
  );
}

export default LandingPage