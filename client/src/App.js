import React from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkin from './pages/Checkin';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

const App = () => {
  const { user } = useSelector((state) => state.auth);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          {/* 
          Route protected...
          {user && <Route path='/home' element={<Dashboard />} />}
          {user && <Route path='/checkin' element={<Checkin />} />} */}

          <Route path="/home" element={<Dashboard />} />
          <Route path="/checkin" element={<Checkin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
