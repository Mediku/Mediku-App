import React, {useEffect} from 'react'
import './Pages.scss'
import {useDispatch,useSelector} from 'react-redux'
import {dataRegistrationAsync} from '../store/action/index'

function History() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(dataRegistrationAsync())
    }, [dispatch])
    const dataRegistration = useSelector(state => state.dataRegistration)
    console.log(dataRegistration);
    return (
        <div>
            <div className="history-container">
                <h1>Your Registration's List</h1>
                <div className="grid-template">
                {
                            dataRegistration?.map((data)=> {
                                return (
                                    <div class="max-w-2xl bg-white border-2 border-gray-300 p-6 rounded-md tracking-wide shadow-lg container-history">
                                        <div id="header" class="flex items-center mb-4"> 
                                            <img alt="avatar" class="w-20  border-2 border-gray-300" src={data.Clinic.imageURL} />
                                            <div id="header-text" class="leading-6 ml-8 sm">
                                                <h4 id="name" class="text-xl font-semibold">{data.Clinic.name}</h4>
                                                <h5 id="job" class="font-semibold text-gray-600">{data.Clinic.address}</h5>
                                            </div>
                                        </div>
                                        <div id="quote">
                                            <p class=" text-gray-600">
                                                name : {data.User.full_name} <br />
                                                chosen service : {data.service_name} <br />
                                                total price : RP. {data.total_price}
                                            </p>
                                            {
                                                data.is_paid === false ? 
                                                <div>
                                                     <button className="button button-grow unpaid">pay now</button>
                                                     <button className="button button-grow unpaid right">confirm payment</button>
                                                </div>
                                                 :
                                                <button disabled className="paid">paid</button>
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                </div>
                        
                </div>
                
                
                
                    
            </div>
    )
}

export default History
