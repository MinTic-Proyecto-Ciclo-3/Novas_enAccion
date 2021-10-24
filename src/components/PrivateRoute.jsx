import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";

const PrivateRoute = ({children}) => {
    const { user, isAuthenticated, isLoading } = useAuth0();
  
    if(isLoading) return <div>Loading...</div>
    
    return isAuthenticated ? (
    <> {children}</>) : (
        <div className= 'text-9xl text-red-500'>
            No estás autorizado
        </div>
    )
    
};

export default PrivateRoute
