import React from 'react';
import { Link } from 'react-router-dom';
import logo from 'media/logo copy.png';
const Navbar = () => {
  return (
    <nav className='bg-gray-800 text-white rounded-lg'>

      <ul className='flex w-full justify-between my-3'>
        <li>
        <img src={logo} alt='imagen'className='w-16'p-4/>
        </li>
        <li>NOVATOS EN ACCION</li>
        <li>HISTORIA</li>
       
      
        <li className='px-4'>
          <Link to='/login'>
            <button className='bg-green-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
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
