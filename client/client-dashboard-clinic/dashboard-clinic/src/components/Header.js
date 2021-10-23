import React from 'react'
import {useHistory} from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Header() {
	const history = useHistory()
	const Logout = () => {
		localStorage.clear()
		history.push('/')
		Swal.fire(
		  'You`re loged out',
		  'success'
		)
	}

	return (
		<div className="flex justify-between align-items-center w-full">
			<div className="ml-5">
				<i className="fas fa-bars"></i>
			</div>
			<div className="flex align-items-center space-x-2 mr-5">
				<div>
					<button 
						onClick={Logout}
						className="text-sm bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
					  logout
					</button>
				</div>
			</div>
		</div>
	)
}