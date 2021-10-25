import React from "react";
import "./navbar.scss";
import "../App.scss";
import { Link } from "react-router-dom";
import {useHistory} from 'react-router-dom'
function Navbar() {
    const history = useHistory()
    function logOut(){
        localStorage.clear()
        history.push('/login')
    }
  return (
    <div className="container-navbar">
      <nav>
        <div className="logo">
          <Link className="router" to="/">
            <h1>Mediku</h1>
          </Link>
        </div>
        <div>
          <ul>
            <li className="list">
              <Link className="router" to="/">
                Home
              </Link>
            </li>
            <li className="list">
              <Link className="router list" to="/locations">
                Locations
              </Link>
            </li>
            {
                localStorage.getItem("access_token") ? 
                <li className="list">
              <Link className="router list" to="/history">
                History
              </Link>
            </li> : ''
            }
            
            {
                localStorage.getItem("access_token") ?  <li className="list" onClick={()=>logOut()} style={{cursor: 'pointer'}}>
                <i class="fas fa-sign-out-alt"></i>
                </li> : ''
            }


            <li className="list">
              <Link className="router button grow" to="/register">
                Register Test
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
