import React from 'react'
import { Link } from 'react-router-dom'
import './../index.css'

export default function Sidebar() {

	return (
		<div class="flex flex-col min-h-screen w-52 p-4 shadow-lg">
			<h1 class="text-center sidebar-logo text-blue-500">Mediku</h1>
			<div class="mx-auto mt-5 flex flex-col">
				<div class="box-border border-2 border-2 p-2 h-20 w-20 rounded-md shadow-lg">
					<img src="https://image.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg"
					class="object-cover h-16" 
					/>
				</div>
				<div class="mt-3">
					<p class="text-sm text-center font-medium">TB Simatupang</p>
				</div>
			</div>
			<div class="flex flex-col mt-5">
				<div class="flex space-x-2">
					<div>
						<i class="fas fa-home text-blue-800"></i>
					</div>
					<div>
						<Link to="/">
						<button class="text-sm">Home</button>
						</Link>
					</div>
				</div>
			</div>

			<div class="flex flex-col mt-5">
				<div class="flex space-x-2">
					<div>
						<i class="fas fa-users text-blue-800"></i>
					</div>
					<div>
						<Link to="/patients">
						<button class="text-sm">Patients</button>
						</Link>
					</div>
				</div>
			</div>

		</div>
	)
}