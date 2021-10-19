import React, {useState,useEffect} from 'react'
import './Pages.scss'
import {useDispatch,useSelector} from 'react-redux'
import {fetchProvincesAsync,fetchRegenciesAsync,fetchDistrictsAsync,fetchSubDistrictsAsync} from '../store/action/index'
function RegisterTest() {
    const dispatch = useDispatch()
    useEffect(()=> {
        dispatch(fetchProvincesAsync())
    }, [dispatch])
    const [full_name, setFullName]= useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [phone_number, setPhoneNumber] = useState('')
    const [identity_card_number, setIdentityCardNumber] = useState('')
    const [identity_card_address, setIdentityCardAddress] = useState('')
    // eslint-disable-next-line
    const [gender, setGender] = useState('')
    const [date_of_birth, setDateOfBirth] = useState('')
    const [province,setProvince] = useState('')
    const [district, setDistrict] = useState('')
    const [sub_district, setSubDistrict] = useState('')
    const [regency, setRegency] = useState('')
    const [RT, setRT] = useState('')
    const [RW, setRW] = useState('')
    const dataLogin = useSelector(state => state.dataLogin)
    useEffect(()=> {
        setFullName(dataLogin.full_name)
        setEmail(dataLogin.email)
        setPassword(dataLogin.password)
        setPhoneNumber(dataLogin.phone_number)
        setIdentityCardNumber(dataLogin.identity_card_number)
        setIdentityCardAddress(dataLogin.identity_card_address)
        setGender(dataLogin.gender)
        setDistrict(dataLogin.district)
        setSubDistrict(dataLogin.sub_district)
        setRegency(dataLogin.regency)
        setRT(dataLogin.RT)
        setRW(dataLogin.RW)

    }, [dataLogin])
    function setAddPhoneNumber(e){
        setPhoneNumber(e.target.value)
    }
    function setAddFullName(e){
        setFullName(e.target.value)
        
    }
    function setAddIdentityCardNumber(e){
        setIdentityCardNumber(e.target.value)
        
    }
    function setaddIdentityCardAddress(e){
        setIdentityCardAddress(e.target.value)
      
    }
    function setAddGender(e){
        
        setGender(e.target.value)
    }
    function setAddDateOfBirth(e){
        setDateOfBirth(e.target.value)
        
    }
    function setAddEmail(e){
        setEmail(e.target.value)
    }

    function setAddProvince(e){
       setProvince(e.target.value)
       const provinsi = provincesList.filter((prov)=> prov.nama === e.target.value)
       const provID = +provinsi[0].id;
       dispatch(fetchRegenciesAsync(provID))

    }
    function setAddRegency(e){
        setRegency(e.target.value)
        const regency = regenciesList.filter((reg)=> reg.nama === e.target.value)
        const regID = +regency[0].id
        dispatch(fetchDistrictsAsync(regID))
    }
    function setAddDistrict(e){
        setDistrict(e.target.value)
        const district1 = districtsList.filter((dis)=> dis.nama === e.target.value) 
        const disID = +district1[0].id 
        dispatch(fetchSubDistrictsAsync(disID))  
    }
    function setAddSubDistrict(e){
        setSubDistrict(e.target.value)
        
    }
    function setAddRT(e){
        setRT(e.target.value)
    }
    function setAddRW(e){
        setRW(e.target.value)
    }
    function setAddPassword(e){
        setPassword(e.target.value)
    }
    const provincesList = useSelector(state => state.provinces)
    const regenciesList = useSelector(state => state.regencies) 
    const districtsList = useSelector(state => state.districts) 
    const subDistrictsList = useSelector(state => state.subDistricts) 
    return (
        <div>
            <div className="register">
            <div className="flex justify-center items-center w-full my-10">
                <div className="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                    <h2 className="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Form pendaftaran test</h2>
                    <form >
                    <div className="flex flex-col mb-4">
                        <input className="border py-2 px-3 text-grey-800" type="text" name="full_name" id="full_name" placeholder="Full Name" value={full_name} onChange={setAddFullName}></input>
                    </div>
                    <div className="flex flex-col mb-4">
                        <input className="border py-2 px-3 text-grey-800" type="text" name="phone_number" id="phone_number" placeholder="Phone number" value={phone_number} onChange={setAddPhoneNumber}></input>
                    </div>
                

                    <div className="flex flex-col mb-4">
                        <input className="border py-2 px-3 text-grey-800" type="text" name="identity_card_number" id="identity_card_number" placeholder="Identity Card Number (NIK)" value={identity_card_number} onChange={setAddIdentityCardNumber}></input>
                    </div>
                    <div className="flex flex-col mb-4">
                        <textarea className="border py-2 px-3 text-grey-800"  name="identity_card_address" id="identity_card_address" placeholder="Identity Card address" value={identity_card_address} onChange={setaddIdentityCardAddress}></textarea>
                    </div>
                    <div className="flex flex-col mb-4 gender-box">
                        <label className="mb-2 font-bold text-lg text-gray-900" for="gender">Gender</label>
                        
                        {
                            dataLogin.gender === 'Female' ? 
                            <div className="gender-box2"> 
                                <div>
                                <input type="radio"  id="gender" name="gender" value="Female"  onChange={setAddGender} checked></input>
                                <label for="female"> Female</label>
                                
                                </div>
                                <div>
                                <input type="radio" id="gender" name="gender" value="Male" onChange={setAddGender} ></input>
                                <label for="male"> Male</label>
                                </div>
                            </div>
                            : 
                            <div className="gender-box2">
                                <div>
                                <input type="radio"  id="gender" name="gender" value="Female"  onChange={setAddGender}></input>
                                <label for="female"> Female</label>
                                
                                </div>
                            <div>
                                <input type="radio" id="gender" name="gender" value="Male" onChange={setAddGender} checked></input>
                                <label for="male"> Male</label>
                            </div>
                            </div>
                        }

                    </div>
                    <div className="flex flex-col mb-4">
                    <label className="mb-2 font-bold text-lg text-gray-900" for="date_of_birth">Date of birth</label>

                        <input className="border py-2 px-3 text-grey-800" type="date" name="date_of_birth" id="date_of_birth" value={date_of_birth} onChange={setAddDateOfBirth}></input>
                    </div>
             
                    <div className="flex flex-col mb-4">
                        <input className="border py-2 px-3 text-grey-800" type="email" name="email" id="email" placeholder="Email" value={email} onChange={setAddEmail}></input>
                    </div>
                    <div className="flex flex-row mb-4 justify-between	">
                        <label className="mb-2  text-lg text-gray-900" for="Select">Province</label>
                        <select className="border py-2  text-grey-800 p-10 w-80" value={province} onChange={setAddProvince} required>
                                <option value="" disabled>--choose province--</option>
                                {
                                    provincesList.map((province)=> {
                                        return (<option value={province.nama}  key={province.id}
                                        >{province.nama}</option>)
                                    })
                                }
                        </select>
                    </div>
                    <div className="flex flex-row mb-4 justify-between	">
                        <label className="mb-2 text-lg text-gray-900" for="Select">Regency</label>
                        <select className="border py-2  text-grey-800 p-10 w-80" value={regency} onChange={setAddRegency}>
                        <option value="" selected disabled>--choose regency--</option>
                                {
                                    regenciesList?.map((regency)=> {
                                        return (<option value={regency.nama}  key={regency.id}
                                        >{regency.nama}</option>)
                                    })
                                }
                        </select>
                    </div>
                    <div className="flex flex-row mb-4 justify-between	">
                        <label className="mb-2  text-lg text-gray-900" for="Select">District</label>
                        <select className="border py-2  text-grey-800 p-10 w-80" value={district} onChange={setAddDistrict}>
                        <option value="" selected disabled>--choose district--</option>

                        {
                                    districtsList?.map((district)=> {
                                        return (<option value={district.nama}  key={district.id}
                                        >{district.nama}</option>)
                                    })
                                }
                        </select>
                    </div>
                    <div className="flex flex-row mb-4 justify-between	">
                        <label className="mb-2  text-lg text-gray-900" for="Select">Sub District</label>
                        <select className="border py-2  text-grey-800 p-10 w-80" value={sub_district} onChange={setAddSubDistrict}>
                        <option value="" selected disabled>--choose sub district--</option>

                        {
                                    subDistrictsList.map((subDistrict)=> {
                                        return (<option value={subDistrict.nama}  key={subDistrict.id}
                                        >{subDistrict.nama}</option>)
                                    })
                                }
                        </select>
                    </div>
                    <div className="flex flex-row mb-4 justify-between">
                        <label className="mb-2  text-lg text-gray-900" >RT</label>
                        <input className="border py-2 px-3 text-grey-800 w-80	" type="text" name="RT" id="RT" value={RT} onChange={setAddRT}></input>

                    </div>
                    <div className="flex flex-row mb-4 justify-between">
                        <label className="mb-2  text-lg text-gray-900" for="Select">RW</label>
                        <input className="border py-2 px-3 text-grey-800 w-80	" type="text" name="RW" id="RW" value={RW} onChange={setAddRW}></input>

                    </div>
                    <div className="flex flex-row mb-4 justify-between	">
                        <label className="mb-2  text-lg text-gray-900">Clinic</label>
                        <select value="ClinicId" className="border py-2  text-grey-800 p-10 w-80">
                                <option value="" disabled>--choose clinic--</option>
                                <option value="Clinic1">Klinik 1</option>
                                <option value="Clinic2">Klinik 2</option>
                                <option value="Clinic3">Klinik 3</option>
                        </select>
                    </div>
                    <div className="flex flex-row mb-4 justify-between	">
                        <label className="mb-2  text-lg text-gray-900">Service</label>
                        <select value="service_name" className="border py-2  text-grey-800 p-10 w-80">
                                <option value="" disabled>--choose service--</option>
                                <option value="pcr">PCR</option>
                                <option value="swab">SWAB</option>
                        </select>
                    </div>
                    <div className="flex flex-row mb-4 justify-between">
                        <label className="mb-2  text-lg text-gray-900" >Price</label>
                        <input className="border py-2 px-3 text-grey-800 w-80	" type="text" name="total_price" id="total_price"></input>

                    </div>
                    <div className="flex flex-col mb-4">
                    <label className="mb-2 font-bold text-lg text-gray-900" for="date_of_birth">Date</label>

                        <input className="border py-2 px-3 text-grey-800" type="date" name="date" id="date" ></input>
                    </div>

                    <div className="flex flex-col mb-4">
                        <input className="border py-2 px-3 text-grey-800"  type="password"name="password" id="password" placeholder="Password" value={password} onChange={setAddPassword}></input>
                    </div>          
                    <button className="block bg-blue-600 hover:bg-blue-900 text-white uppercase text-lg mx-auto p-4 rounded" type="submit">Submit form</button>
                    </form>
                </div>
            </div>
        </div>
        </div>
    )
}

export default RegisterTest
