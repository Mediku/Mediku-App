import "./App.css";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Locations from "./pages/Locations";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import History from "./pages/History";
import RegisterTest from "./pages/RegisterTest";
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
      <Route path="/contact-us">
        <Navbar></Navbar>
        <ContactUs></ContactUs>
      </Route>
      <Route path="/login">
        <Navbar></Navbar>
        <Login></Login>
      </Route>
      <Route path="/history">
        <Navbar></Navbar>
        <History></History>
      </Route>
      <Route path="/register-test">
        <Navbar></Navbar>
        <RegisterTest></RegisterTest>
      </Route>
      <Route path="/">
        <Navbar></Navbar>
        <Home></Home>
      </Route>
    </Switch>
  );
}

export default App;
