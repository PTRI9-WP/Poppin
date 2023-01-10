import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import * as ReactDOM from 'react-dom';
import Checkin from './pages/Checkin';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

//temporarily imported just for rendering
import LoginModal from './components/LoginModal';
import RegisterModal from './components/RegisterModal';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Dashboard />} />
          <Route path='/Checkin' element={<Checkin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
