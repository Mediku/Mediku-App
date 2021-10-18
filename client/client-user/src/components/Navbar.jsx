import React from 'react'
import './navbar.scss'
import '../App.scss'
import {Link} from 'react-router-dom'
function Navbar() {
    return (
        <div className="container-navbar">
            <nav>
            <div className="logo">
                <Link class="router" to="/"><h1>Mediku</h1></Link>
            </div>
            <div>
                <ul>
                    <li><Link class="router" to="/">Home</Link></li>
                    <li><Link class="router" to="/locations">Locations</Link></li>
                    <li><Link class="router" to="/about-us">About Us</Link></li>
                    <li><Link class="router" to="/contact-us">Contact Us</Link></li>
                    <li><Link class="router button" to="/register">Register Test</Link></li>

                </ul>
            </div>
            
        </nav>
        </div>

    )
}

export default Navbar
