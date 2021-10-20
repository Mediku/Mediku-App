import React, {useEffect} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import './Pages.scss'
import '../App.scss'
import {Link} from 'react-router-dom'
import {dataClinicAsync} from '../store/action/index'

function Locations() {
    
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(dataClinicAsync())
    }, [dispatch])
    const dataClinic = useSelector(state => state.dataClinic)
    const clinicList = dataClinic.list 
    console.log(clinicList);
    return (
        <div class="locations">
            <div className="box-container-location">
            <h2>Find your nearest Mediku Service</h2>
            <div className="flex-location">
            {
                clinicList?.map((clinic=> {
                    return (
                        <div class="box-location">
                            <div className="flex-picture">
                                <img src={clinic.imageURL} alt="" />
                                <div className="text-location">
                                    <div>
                                    <h3>{clinic.name}</h3>
                                    </div>
                                    <div>
                                    <h4><i class="fab fa-whatsapp"></i> {clinic.phone_number}</h4>
                                    </div>
                                    <div>
                                    <p>{clinic.address}</p>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="second-box">
                                <div className="hours">
                                    {
                                        clinic.operational_day_open.includes('Senin','Selasa','Rabu','Kamis','Jumat') ? 
                                       <p>
                                           Senin-Jumat ({clinic.operational_time_open} - {clinic.operational_time_close})
                                       </p>
                                       :
                                       <p>
                                           Senin-Kamis ({clinic.operational_time_open} - {clinic.operational_time_close})
                                       </p>
                                    }
                                    
                                </div>
                                <div className="links">
                                    <Link class ="button router button-location button-grow" to="/register">Book a test</Link>
                                </div>
                            </div>
            
                        </div>
                    )
                }))
            }
            </div>


            </div>

        </div>
    )
}

export default Locations
