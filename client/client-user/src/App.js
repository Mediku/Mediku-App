import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Locations from "./pages/Locations";
import AboutUs from "./pages/AboutUs";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import "./App.scss";
import "./index.css";

import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/register">
        <Navbar></Navbar>
        <Register></Register>
      </Route>
      <Route path="/locations">
        <Navbar></Navbar>
        <Locations></Locations>
      </Route>
      <Route path="/about-us">
        <Navbar></Navbar>
        <AboutUs></AboutUs>
      </Route>
      <Route path="/contact-us">
        <Navbar></Navbar>
        <ContactUs></ContactUs>
      </Route>
      <Route path="/login">
        <Navbar></Navbar>
        <Login></Login>
      </Route>
      <Route path="/">
        <Navbar></Navbar>
        <Home></Home>
      </Route>
    </Switch>
  );
}

export default App;
