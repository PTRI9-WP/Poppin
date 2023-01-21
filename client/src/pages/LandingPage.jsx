import React, { useState } from 'react';
import { IoAccessibility } from 'react-icons/io5';
import bar from '../assets/images/bar.jpg';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';
import FootImg from './svg/footer.svg';
import { useInView } from 'react-intersection-observer';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showReg, setShowReg] = useState(false);

  const [ref, inView] = useInView({
    /* options */
    threshold: 0.5, // the amount of the element that needs to be in the viewport to trigger the callback
  });

  return (
    <>
      <div
        className='landingPage'
        style={{
          filter: showLogin || showReg ? 'blur(5px)' : 'none',
          overflow: 'hidden',
        }}
      >
        <div>
          <Header setShowLogin={setShowLogin} setShowReg={setShowReg} />
        </div>
        {/* This will render the login and registration modals when clicked (and off when x'ed out) */}
        <FootImg className='foot' />
        <div
          className='parallax'
          style={{ backgroundImage: 'url(' + bar + ')' }}
        />
        <ul className='cards' ref={ref}>
          <li className='card'>
            <div>
              <IoAccessibility />
              <IoAccessibility />
            </div>
            <h2>Hate Crowds?</h2>
            <p>Find a great deal while being in a more intimate setting.</p>
          </li>
          <li className='card'>
            <div>
              <IoAccessibility />
              <IoAccessibility />
              <IoAccessibility />
            </div>

            <h2>Love Crowds?</h2>
            <p>
              With Poppin's proprietary crowd monitoring technology we'll help
              you find the livest venue in town!
            </p>
          </li>
          <li className='card'>
            <div>
              <IoAccessibility />
              <IoAccessibility />
              <IoAccessibility />
              <IoAccessibility />
              <IoAccessibility />
            </div>
            <h2>More People!</h2>
            <p>
              Poppin' will help people see your incentives and marketing efforts
              to get them in the door.
            </p>
          </li>
        </ul>
      </div>

      {showLogin ? <LoginModal setShowLogin={setShowLogin} /> : null}
      {showReg ? <RegisterModal setShowReg={setShowReg} /> : null}
    </>
  );
};

export default LandingPage;
