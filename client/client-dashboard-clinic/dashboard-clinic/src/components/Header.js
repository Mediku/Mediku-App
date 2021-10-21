import React from 'react'
import {useHistory} from 'react-router-dom'

export default function Header() {
	const history = useHistory()
	const Logout = () => {
		localStorage.clear()
		history.push('/')
	}

	return (
		<div class="flex justify-between align-items-center w-full">
			<div class="ml-5">
				<i class="fas fa-bars"></i>
			</div>
			<div class="flex align-items-center space-x-2 mr-5">
				<div>
					<button 
						onClick={Logout}
						class="text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
					  logout
					</button>
				</div>
			</div>
		</div>
	)
}