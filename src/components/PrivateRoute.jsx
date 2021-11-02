import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const PrivateRoute = ({children}) => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently  } = useAuth0();
  
    useEffect(() => {
        const fetchAuth0Token = async ()=>{
            const accessToken = await getAccessTokenSilently({
            audience:'api-novatos',
        });
        localStorage.setItem('token',accessToken);
    };
    if (isAuthenticated){        
        fetchAuth0Token();
    }
    }, [isAuthenticated, getAccessTokenSilently]);

    if(isLoading) return <div>Loading...</div>
    
    if(!isAuthenticated){<div className= 'flex flex-col text-8xl text-red-500 items-center'>
    No estás autorizado
    <Link to='/'>
    <button            
    className=' bg-gray-400 text-gray-900 text-3xl p-2 rounded-lg'>
        VOLVER AL HOME</button>
    </Link>
</div>}

    return <> {children}</>;
    
};

export default PrivateRoute
