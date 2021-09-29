import Layout from 'layouts/Layout';
import Index from './pages/Index';
import Modulo_vendedores from 'pages/Modulo_vendedores';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './app.css';

function App() {
  return (
    <div className='App'>
      <Router>
        <Switch>
          <Layout>
            <Switch>
            <Route path='/Modulo_vendedores'>
              <Modulo_vendedores/>
            </Route>
            <Route path='/'>
              <Index />
            </Route>     
            </Switch> 
          </Layout>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
