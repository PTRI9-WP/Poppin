import React from 'react';
import Header from '../components/Header';
import { Link } from 'react-router-dom'
import Map from '../components/Maps';
const Dashboard = () => {
  return (
    <>
      <Header />
      <div>content goes here</div>
      <Map></Map>
    <Link to = '/'> temp link to landing page </Link>

    </>
  );
};

export default Dashboard;
