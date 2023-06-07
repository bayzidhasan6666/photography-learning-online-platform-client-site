import React from 'react';
import Navbar from './pages/SharedCompo/Navbar/Navbar';
import { Outlet } from 'react-router-dom';
import Footer from './pages/SharedCompo/Footer/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar></Navbar>
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer></Footer>
    </div>
  );
};

export default App;