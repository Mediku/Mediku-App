import React from "react";
import "./navbar.scss";
import "../App.scss";
import { Link } from "react-router-dom";
function Navbar() {
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
            {/* <li className="list">
              <Link className="router list" to="/contact-us">
                Contact Us
              </Link>
            </li> */}
            <li className="list">
              <Link className="router list" to="/history">
                History
              </Link>
            </li>
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
