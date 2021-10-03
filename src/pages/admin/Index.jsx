import { useDarkMode } from 'context/darkMode';
import React from 'react';
import logo from 'media/Fond1ej.jpg';
const Admin = () => {
  const { darkMode } = useDarkMode();
  return <div className={`flex h-full w-full bg-gray-${darkMode ? '900' : '50'}`}>
  <li>
  <img src={logo} alt='imagen'className='w-40'/>
  </li>
  
  
  
  </div>;
  
};

export default Admin;
