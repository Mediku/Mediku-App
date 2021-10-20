import React,{useState} from 'react'
import {useDispatch} from 'react-redux'
import {loginUserAsync,loginUser} from '../store/action/index'
import { useHistory } from "react-router-dom";

function Login() {
    const history = useHistory();
    const dispatch = useDispatch()
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    function setLoginEmail(e){
        setEmail(e.target.value)
    }
    function setLoginPassword(e){
        setPassword(e.target.value)
    }
    function submitLogin(e){
        e.preventDefault()
        const payload = {
            email,
            password
        }
        dispatch(loginUserAsync(payload))
        .then((res) => res.json())
        .then((data) => {
        localStorage.setItem("access_token", data.access_token);
        dispatch(loginUser(data));
        history.push('/register-test')
        })
        .catch((err) => {
        console.log(err);
        });
        
        
    }
    return (
        <div>
            <div className="flex justify-center items-center w-full my-10">
                <div class="w-1/2 bg-white rounded shadow-2xl p-8 m-4">
                    <h2 class="block w-full text-center text-gray-800 text-2xl font-bold mb-6">Login your account</h2>
                    <form onSubmit={submitLogin} >
                    <div class="flex flex-col mb-4">
                        <input class="border py-2 px-3 text-grey-800" type="email" name="email" id="email" placeholder="Email" value={email} onChange={setLoginEmail}></input>
                    </div>
                    <div class="flex flex-col mb-4">
                        <input class="border py-2 px-3 text-grey-800"  type="password"name="password" id="password" placeholder="Password" value={password} onChange={setLoginPassword} ></input>
                    </div>
                    <button class="block bg-blue-600 hover:bg-blue-900 text-white uppercase text-lg mx-auto p-2 rounded" type="submit" >Login account</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
