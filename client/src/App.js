import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import * as ReactDOM from 'react-dom';
import Checkin from './pages/Checkin';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/Checkin' element={<Checkin />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
