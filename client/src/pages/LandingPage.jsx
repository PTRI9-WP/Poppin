import React from 'react'
import Header from '../components/Header'
import { Link } from 'react-router-dom'
import bar from '../assets/images/bar.jpg';

const LandingPage = () => {
  return (
    <>
      <div className='top'>
        <img src={bar} alt='bar' className='barPic' />
        <Header className='header'/>
      </div>
      {/* <Link to='/home'> temp link to dashboard </Link> */}
    </>
  );
}

export default LandingPage