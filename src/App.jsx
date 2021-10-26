import React, { useState, useEffect } from 'react';
import PrivateLayout from 'layouts/PrivateLayout';
import PublicLayout from 'layouts/PublicLayout';
import Index from 'pages/Index';
import Admin from 'pages/admin/Index';
import Venta from './pages/GestionVentas';
import Productos from 'pages/Productos';

import Login from 'pages/auth/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'styles/styles.css';
import Registro from 'pages/auth/Registro';
import AuthLayout from 'layouts/AuthLayout';
import { DarkModeContext } from 'context/darkMode';
import Usuarios from './pages/Usuarios';
import { Auth0Provider } from "@auth0/auth0-react";


function App() {
  const [darkMode, setDarkMode] = useState(false);
  useEffect(() => {
    console.log('modo dark:', darkMode);
  }, [darkMode]);

  return (
      <Auth0Provider
      domain="novatos.us.auth0.com"
      clientId="r5VH0CqFv7O5kKgmZAQbDUdGbkgIYzt1"
      redirectUri='https://pacific-sea-96272.herokuapp.com/admin/'
      audience ='api-novatos'
      >
      
    <div className='App'>
      <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
        <Router>
          <Switch>
            <Route path={['/admin', '/admin/Productos', '/admin/Ventas', '/admin/Usuarios']}>
              <PrivateLayout>
                <Switch>
                  <Route path='/admin/Productos'>
                    <Productos/>
                  </Route>
                  <Route path='/admin/Ventas'>
                    <Venta/>
                  </Route>
                  <Route path='/admin/Usuarios'>
                    <Usuarios/>
                  </Route>
                  <Route path='/admin'>
                    <Admin />
                  </Route>
                </Switch>
              </PrivateLayout>
            </Route>
            <Route path={['/login', '/registro']}>
              <AuthLayout>
                <Switch>
                  <Route path='/login'>
                    <Login />
                  </Route>
                  <Route path='/registro'>
                    <Registro />
                  </Route>
                </Switch>
              </AuthLayout>
            </Route>
            <Route path={['/']}>
              <PublicLayout>
                <Route path='/'>
                  <Index />
                </Route>
              </PublicLayout>
            </Route>
          </Switch>
        </Router>
      </DarkModeContext.Provider>
    </div>
    </Auth0Provider>
  );
}

export default App;
