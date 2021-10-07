import Layout from 'layouts/Layout';
import index from './pages/index';
import ModuloVendedores from 'pages/ModuloVendedores';
import ModuloMventas from 'pages/ModuloMventas';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.css';

function App() {
  return (
    <div className='App'> 
      <Router>
        <Switch>
          <Layout>
            <Switch>
             <Route path='/ModuloVendedores'>
              <ModuloVendedores/>
             </Route>
             <Route path='/ModuloMventas'>
              <ModuloMventas/>
             </Route>
             <Route path='/'>
                <index />
              </Route>     
            </Switch> 
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
