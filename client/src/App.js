import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import * as ReactDOM from 'react-dom';
import Checkin from './pages/Checkin';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/homepage' element={<LandingPage />} />
          <Route path='/Checkin' element={<Checkin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
