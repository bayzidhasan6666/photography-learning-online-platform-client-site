import React, { useState } from 'react';
import Slider from '../Slider/Slider';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark bg-[#1c1c1dfb]' : 'light'}>
      <div className="">
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="toggle bg-pink-400"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
          </label>
        </div>
        <Slider />
      </div>
    </div>
  );
};

export default Home;
