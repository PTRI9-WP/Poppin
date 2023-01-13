import React, { useState } from 'react';
import { IoAccessibility } from 'react-icons/io5';
import bar from '../assets/images/bar.jpg';
import Header from '../components/Header';
import LoginModal from '../components/LoginModal';
import RegisterModal from '../components/RegisterModal';

const LandingPage = () => {
  const [showLogin, setShowLogin] = useState(false);
  const [showReg, setShowReg] = useState(false);

  return (
    <>
      <div className={showLogin || showReg ? 'overlay' : null}>
        <div className="top">
          <Header setShowLogin={setShowLogin} setShowReg={setShowReg} />
          <img src={bar} alt="bar" className="barPic" />
        </div>
        {/* This will render the login and registration modals when clicked (and off when x'ed out) */}

        <div className="info">
          <ul className="promo">
            <li className="infoCards">
              <div className="ppl">
                <IoAccessibility size={30} />
                <IoAccessibility size={30} />
              </div>
              <h2>Hate Crowds?</h2>
              <p>Find a great deal while being in a more intimate setting.</p>
            </li>
            <li className="infoCards">
              <div className="ppl">
                <IoAccessibility size={30} />
                <IoAccessibility size={30} />
                <IoAccessibility size={30} />
              </div>

              <h2>Love Crowds?</h2>
              <p>
                With Poppin's proprietary crowd monitoring technology we'll help
                you find the livest venue in town!
              </p>
            </li>
            <li className="infoCards">
              <div className="ppl">
                <IoAccessibility size={30} />
                <IoAccessibility size={30} />
                <IoAccessibility size={30} />
                <IoAccessibility size={30} />
                <IoAccessibility size={30} />
              </div>
              <h2>More People!</h2>
              <p>
                Poppin' will help people see your incentives and marketing
                efforts to get them in the door.
              </p>
            </li>
          </ul>
        </div>
      </div>

      {showLogin ? <LoginModal setShowLogin={setShowLogin} /> : null}
      {showReg ? <RegisterModal setShowReg={setShowReg} /> : null}
    </>
  );
};

export default LandingPage;
