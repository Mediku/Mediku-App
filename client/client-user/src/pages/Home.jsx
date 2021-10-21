import React from 'react'
import './Pages.scss'
import './../components/Map'
import image from '../assets/images/doctor.png'
import {Link} from 'react-router-dom'
import Map from './../components/Map'
function Home() {
    return (
        <div className="all-container">
            <div className="landing-container">
            <div class="container">
                <div className="text-landing-page">
                    <h2 class="heading">We provide PCR and Antigen Test for you</h2>
                    <h2 class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non tempora magnam illo incidunt, voluptas debitis aliquid accusantium delectus pariatur asperiores.</h2> <br />
                    <Link class ="router button button-grow button-landing" to='/register'>Book a test</Link>
                </div>
                <div className="photo-landing-page">
                    <img src={image} style={{zIndex: -1}} alt="" />
                </div>
            
            </div>
            </div>
           
            <section>
                <div className="box-container">
                    <div className="box1">
                        <div className="text">
                            <h2><i class="fas fa-map-marked-alt"></i> Lokasi drive-thru</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, corporis?</p>
                        </div>

                    </div>
                    <div className="box2">
                        <div className="text">
                            <h2><i class="fas fa-store"></i> Home & Corporate service</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, corporis?</p>
                        </div>
                        
                    </div>
                    <div className="box3">
                        <div className="text">
                            <h2><i class="fas fa-history"></i> Hasil cepat</h2>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur, corporis?</p>
                        </div>

                    </div>
                </div>
            </section>
            <div className="steps flex items-center min-h-screen justify-center">
                <div className="flex-box">
                    <div className="text-bar">
                        <h2>Easy steps to do SWAB Test with <span className="mediku">Mediku</span></h2>
                        <p>Choose your own schedule to do SWAB test with the easiest way and fast with mediku. Get your result within 16 hours.</p>
                    </div>
                    <div className="grid-box grid grid-cols-4 gap-5">
                    <div className="step-1 row-span-2 col-span-2 bg-gray-500 rounded"><p>Online Registration</p></div>
                    
                    <div className="step-2 col-span-2 bg-gray-500rounded"><p>Choose Date</p></div>
                    <div className="step-3 bg-gray-500 rounded"><p>SWAB TEST</p></div>
                    <div className="step-4 bg-gray-500 rounded"><p>Confirmation</p></div>
                     </div>
                </div>

            </div>
            <div className="location-bar">
                <div className="text">
                    <h2>Our Locations</h2>
                    <p>Do swab test drive-thru & walk-in in various places</p>
                </div>
                <div className="location-card">
                    <div className="locations-list">
                        <div className="daftar-lokasi">
                            <p>Locations</p>
                        </div>
                        <div>
                            <p>
                            <i class="fas fa-map-marker-alt"></i> Fairgrounds, SCBD
                            </p>
                            <p>
                            <i class="fab fa-whatsapp"> 08121212</i>
                            </p>
                        
                        </div>
                        <div>
                            <p>
                                <i class="fas fa-map-marker-alt"></i> Fairgrounds, SCBD
                            </p>
                            <p>
                                <i class="fab fa-whatsapp"> 08121212</i>
                            </p>
                        
                        </div>
                        <div>
                            <p>
                            <i class="fas fa-map-marker-alt"></i> Fairgrounds, SCBD
                            </p>
                            <p>
                            <i class="fab fa-whatsapp"> 08121212</i>
                            </p>
                        
                        </div>
                        <div>
                            <p>
                            <i class="fas fa-map-marker-alt"></i> Fairgrounds, SCBD
                            </p>
                            <p>
                            <i class="fab fa-whatsapp"> 08121212</i>
                            </p>
                        
                        </div>
                        <div>
                            <p>
                            <i class="fas fa-map-marker-alt"></i> Fairgrounds, SCBD
                            </p>
                            <p>
                            <i class="fab fa-whatsapp"> 08121212</i>
                            </p>
                        
                        </div>
                        <div>
                            <p>
                            <i class="fas fa-map-marker-alt"></i> Fairgrounds, SCBD
                            </p>
                            <p>
                            <i class="fab fa-whatsapp">08121212</i>
                            </p>
                        
                        </div>
                    </div>
                    <div id="map">
                        <Map></Map>
                    </div>
                    
                </div>
            </div>
            </div>
    )
}

export default Home
