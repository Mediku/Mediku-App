import "./App.css";
import Home from './pages/Home'
import Register from './pages/Register'
import Navbar from './components/Navbar'
import './App.scss'
import './index.css';

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path='/register'>
        <Navbar></Navbar>
        <Register></Register>
      </Route>
      <Route path='/'>
        <Navbar></Navbar>
        <Home></Home>
      </Route>
    </Switch>
  )
}

export default App;
