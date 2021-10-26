import React from 'react';
import logo from 'media/logo copy.png';
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <nav className='bg-gray-800 text-white rounded-lg'>

      <ul className='flex w-full justify-between my-3'>
        <li>
        <img src={logo} alt='imagen'className='w-16'p-4/>
        </li>
        
       
      
        <li className='flex space-between px-4'>
            <Link to='/admin'>
            <button className='m-2 bg-green-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
              Admin
            </button>
            </Link>

            <button onClick={() => loginWithRedirect()} 
            className='m-2 bg-green-500 p-2 text-white rounded-lg shadow-md hover:bg-indigo-700'>
              Iniciar Sesion
            </button>
            
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
