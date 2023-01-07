import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom'
const Dashboard = () => {
  return (
    <>
      <Header />
      <div>content goes here</div>
    <Link to = '/'> temp link to landing page </Link>

    </>
  );
};

export default Dashboard;
