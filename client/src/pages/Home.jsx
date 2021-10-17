import React from 'react'
import './Pages.scss'
import image from '../assets/images/doctor.png'
import {Link} from 'react-router-dom'
function Home() {
    return (
        <div className="all-container">
            <div className="landing-container">
            <div class="container">
                <div className="text-landing-page">
                    <h2 class="heading">We provide PCR and SWAB Test for you</h2>
                    <h2 class="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Non tempora magnam illo incidunt, voluptas debitis aliquid accusantium delectus pariatur asperiores.</h2> <br />
                    <Link class ="router button" to='/register'>Book a test</Link>
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
                <div className="grid grid-cols-2">
                    <div className="text-bar">
                        <h2>Easy steps to do SWAB Test with <span className="mediku">Mediku</span></h2>
                        <p>Choose your own schedule to do SWAB test with the easiest way and fast with mediku. Get your result within 16 hours.</p>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                    <div className=" row-span-2 col-span-2 bg-gray-500 p-3 rounded">1</div>
                    <div className="col-span-2 bg-gray-500 p-3 rounded">2</div>
                    <div className="bg-gray-500 p-3 rounded">3</div>
                    <div className="bg-gray-500 p-3 rounded">4</div>
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
                        <h2>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Porro, cumque.</h2>
                    </div>
                </div>
            </div>
            </div>


        
        
    )
}

export default Home
