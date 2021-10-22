import React from 'react'
import { Link } from 'react-router-dom'
import './../index.css'

export default function Sidebar() {
	return (
		<div className="flex flex-col min-h-screen w-52 p-4 shadow-lg">
			<h1 className="text-center sidebar-logo text-blue-500">Mediku</h1>
			<div className="mx-auto mt-5 flex flex-col">
				<div className="box-border border-2 border-2 p-2 h-20 w-20 rounded-md shadow-lg">
					<img src="https://image.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg"
						alt=""
						className="object-cover h-16"
					/>
				</div>
				<div className="mt-3">
					<p className="text-sm text-center font-medium">TB Simatupang</p>
				</div>
			</div>
			<div className="flex flex-col mt-5">
				<div className="flex space-x-2">
					<div>
						<i className="fas fa-home text-blue-800"></i>
					</div>
					<div>
						<Link to="/">
							<button className="text-sm">Home</button>
						</Link>
					</div>
				</div>
			</div>

			<div className="flex flex-col mt-5">
				<div className="flex space-x-2">
					<div>
						<i className="fas fa-users text-blue-800"></i>
					</div>
					<div>
						<Link to="/patients">
							<button className="text-sm">Patients</button>
						</Link>
					</div>
				</div>
			</div>

		</div>
	)
}