import React from 'react'
import './navbar.scss'
import '../App.scss'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'
function Navbar() {
    const history = useHistory()
    function handleClick(){
        history.push('/login')
    }
    return (
        
        <div className="container-navbar">
            <nav>
            <div className="logo">
                <Link class="router" to="/"><h1>Mediku</h1></Link>
            </div>
            <div>
                <ul>
                    <li className="list"><Link class="router" to="/">Home</Link></li>
                    <li className="list"><Link class="router list" to="/locations">Locations</Link></li>
                    <li className="list"><Link class="router list" to="/contact-us">Contact Us</Link></li>
                    <li className="list"><Link class="router list" to="/history">History</Link></li>
                    <li className="list" onChange={handleClick()}><i class="fas fa-sign-out-alt"></i></li>
                    <li className="list"><Link class="router button grow" to="/register">Register Test</Link></li>
                </ul>
            </div>
            
        </nav>
        </div>

    )
}

export default Navbar
