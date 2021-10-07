import { useDarkMode } from 'context/darkMode';
import React from 'react';
import logo from 'media/Fond1ej.jpg';

const Index = () => {
  const { darkMode } = useDarkMode();
  return (

    
    <div className={`flex w-full bg-gray-${darkMode ? '900' : '500'}`}>
      
      <img src={logo} alt='imagen'className='w-150 opacity=100'/>
    </div>
    
    
  );
};

export default Index;
