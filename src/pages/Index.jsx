import { useDarkMode } from 'context/darkMode';
import React from 'react';
import logo from 'media/Fond1ej.jpg';

const Index = () => {
  const { darkMode } = useDarkMode();
  return (

    <span class="decoration-clone bg-gradient-to-b from-yellow-400 to-red-500 text-transparent ...">
    Hello
    World
    <div className={`flex w-full bg-gray-${darkMode ? '900' : '500'}`}>
      
      <img src={logo} alt='imagen'className='w-150'/>
    </div>
    </span>
    
  );
};

export default Index;
