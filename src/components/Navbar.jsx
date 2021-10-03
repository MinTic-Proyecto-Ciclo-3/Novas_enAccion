import React from 'react';
import { Link } from 'react-router-dom';
import TriggerDarkMode from './TriggerDarkMode';
import logo from 'media/logo copy.png';
const Navbar = () => {
  return (
    <nav className='bg-indigo-500 text-white rounded-lg'>
      <ul className='flex w-full justify-between my-3'>
        <li>
        <img src={logo} alt='imagen'className='w-16'/>
        </li>
        <li>Jose</li>
        <li>Natalia D</li>
        <li>Angie</li>
        <li>Santiago</li>
        <li>Natalia S</li>
        <li>
          <TriggerDarkMode />
        </li>
        <li className='px-3'>
          <Link to='/login'>
            <button className='bg-green-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700 lg:mrk-7'>
              Iniciar Sesion
            </button>
            <Link to='/registro'>
            <button className='bg-green-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
              Registrate
            </button>
            </Link>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
