import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './screens/Home'
import Process from './screens/formProcess'
import AllPatient from './screens/allPatient'
import Login from './screens/login'
import PrivateRoute from './components/'

function App() {
  return (
    <Switch>
      <Route path="/process">
        <Process />
      </Route>      
      <Route path="/patients">
        <AllPatient />
      </Route>
      <Route path="/login">
        <Login />
      </Route>
      <PrivateRoute path='/'>
        <Home />
      </PrivateRoute>
    </Switch> 
  );
}

export default App;
  