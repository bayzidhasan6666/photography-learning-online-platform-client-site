import React, { useState, useEffect } from 'react';
import Slider from '../Slider/Slider';
import PopularClasses from '../PopularClasses/PopularClasses';
import Cameras from '../../Cameras/Cameras';
import PopularInstructors from '../../PopularInstructors/PopularInstructors';

const Home = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme ? storedTheme === 'dark' : false;
  });

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  return (
    <div className={`isDarkMode ? 'dark bg-[#1c1c1dfb]' : 'light' px-2`}>
      <div className="">
        <div className="form-control w-52">
          <label className="cursor-pointer label">
            <input
              type="checkbox"
              className="toggle hidden bg-[#cc40f5]"
              checked={isDarkMode}
              onChange={toggleDarkMode}
            />
          </label>
        </div>
        <Slider />
        <PopularClasses></PopularClasses>
        <PopularInstructors></PopularInstructors>
        <Cameras></Cameras>
      </div>
    </div>
  );
};

export default Home;
