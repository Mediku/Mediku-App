import React from 'react'
import './navbar.scss'
import '../App.scss'
import {Link} from 'react-router-dom'
function Navbar() {
    return (
        <nav>
            <div className="logo">
                <Link class="router" to="/"><h1>Mediku</h1></Link>
            </div>
            <div>
                <ul>
                    <li><Link class="router" to="/">Home</Link></li>
                    <li><Link class="router" to="/">Locations</Link></li>
                    <li><Link class="router" to="/">Services</Link></li>
                    <li><Link class="router" to="/">About Us</Link></li>
                    <li><Link class="router" to="/">Contact Us</Link></li>
                    <li><Link class="router" to="/register">Register Test</Link></li>

                </ul>
            </div>
            
        </nav>
    )
}

export default Navbar
