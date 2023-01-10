import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import * as ReactDOM from 'react-dom';
import Checkin from './pages/Checkin';
import Dashboard from './pages/Dashboard';
import LandingPage from './pages/LandingPage';

//TEMP
//import CheckIn_OutModal from './components/CheckIn_OutModal'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/home' element={<Dashboard />} />

          <Route path='/checkin' element={<Checkin />} />

        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;