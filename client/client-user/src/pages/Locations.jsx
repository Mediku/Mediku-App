import React from 'react'
import './Pages.scss'
import '../App.scss'
import {Link} from 'react-router-dom'

function Locations() {
    return (
        <div class="locations">
            <h2>Find your nearest Mediku Service</h2>
            <div class="box-location">
                <div className="flex-picture">
                    <img src="https://bumamefarmasi.com/wp-content/uploads/2021/09/bumame-farmasi-scbd-1.jpg" alt="" />
                    <div className="text-location">
                        <div>
                        <h1>FairGrounds, SCBD</h1>
                        </div>
                        <div>
                        <h4><i class="fab fa-whatsapp"></i> 08121212</h4>
                        </div>
                        <div>
                        <p>Jl. Jend Sudirman Kav 52-53 Lot 22
                    Senayan, Kebayoran Baru
                    Jakarta Selatan, DKI Jakarta – 12190</p>
                        </div>
                        
                    </div>
                </div>
                <div className="second-box">
                    <div className="hours">
                        <p>Senin-Minggu (08.00 - 17.00)</p>
                    </div>
                    <div className="links">
                        <Link class ="button router" to="/register">Register test COVID</Link>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Locations
