import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin, setUserLogin } from "./../store/actions/";
import { useHistory } from "react-router-dom";
import "./../index.css"

export default function Login() {
	const history = useHistory()
	const dispatch = useDispatch()
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState(false)
	const [userInput, setUserInput] = useState({
		email: '',
		password: ''
	})

	let inputValue = {...userInput}
	const handleInput = (e, key) => {
		inputValue[key] = e.target.value
		setUserInput(inputValue)
	}

	const SubmitLogin = (e) => {
		setLoading(true)
		e.preventDefault()
		dispatch(userLogin(userInput))
			.then(({data}) => {
				dispatch(setUserLogin(data))
				localStorage.setItem('access_token', data.access_token)
				history.push('/')
			})
			.catch(err => {
				setError(err.response.data.message)
				console.log(error)
			})
			.finally((_) => setLoading(false))
	}

	const ButtonSubmit = () => {
		if (loading) {
			return (
				<button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
				<span className="absolute left-0 inset-y-0 flex items-center pl-3">
					<svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
					</svg>
				</span>
				<i class="fa fa-spinner fa-spin"></i>Loading
			</button>

			)
		}else{
			return (
			<button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
				<span className="absolute left-0 inset-y-0 flex items-center pl-3">
					<svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
						<path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
					</svg>
				</span>
				Sign in
			</button>
			)
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
		  <div className="max-w-md w-full space-y-8">
		    <div>
		      <h1 className="text-center sidebar-logo text-blue-500">Mediku</h1>
		    </div>
		    <form 
		    onSubmit={(e) => SubmitLogin(e)}
		    className="mt-8 space-y-6" action="#" method="POST">
		      <input type="hidden" name="remember" value="true" />
		      <div className="rounded-md shadow-sm -space-y-px">
		        <div>
		          <label htmlFor="email-address" className="sr-only">Email address</label>
		          <input 
		          onChange={(e) => handleInput(e, "email")}
		          id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" />
		        </div>
		        <div>
		          <label htmlFor="password" className="sr-only">Password</label>
		          <input 
		          onChange={(e) => handleInput(e, "password")}
		          id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
		        </div>
		      </div>

		      <div className="flex items-center justify-between">
		        <div className="flex items-center">
		          <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
		          <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
		            Remember me
		          </label>
		        </div>

		        <div className="text-sm">
		          <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
		            Forgot your password?
		          </a>
		        </div>
		      </div>

		      <div>
		      	<ButtonSubmit />
		      </div>
		    </form>
		  </div>
		</div>
	)
}