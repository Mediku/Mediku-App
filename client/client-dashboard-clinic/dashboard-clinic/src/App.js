import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Home from './screens/Home'

function App() {
  return (
    <Switch>
      <Route path="/">
        <Home />
      </Route>
    </Switch> 
  );
}

export default App;
  