import "./App.css";
import Home from "./screens/Home";
import Process from "./screens/FormProcess";
import AllPatient from "./screens/AllPatient";
import Login from "./screens/Login";
import PrivateRoute from "./components/PrivateRoute";
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Switch>
      <Route path="/process/:id">
        <Process />
      </Route>

      <Route path="/patients">
        <AllPatient />
      </Route>

      <Route path="/login">
        <Login />
      </Route>

      <PrivateRoute path="/">
        <Home />
      </PrivateRoute>
    </Switch>
  );
}

export default App;
