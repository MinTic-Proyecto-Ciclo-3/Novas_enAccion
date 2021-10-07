import Index from './pages/Index'
import Usuarios


from './pages/Usuarios';
import './App.css';
import { BrowserRouter as Router,  Switch,  Route} from "react-router-dom";
import Publiclayout from './layout/Publiclayout';

function App() {
  return (
    <div>
    <Router>
      <Switch>
        <Route path={['/','/usuarios']}>
        <Publiclayout>
          <Switch>
          <Route path='/usuarios'>
          <Usuarios/>
          </Route>
          <Route path='/'>
          <Index/>
          </Route>
        </Switch>
        </Publiclayout>
        </Route>
      </Switch>
    </Router>
    </div>
  );
}

export default App;
