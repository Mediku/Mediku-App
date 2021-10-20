import React from 'react'

export default function Header() {
	return (
		<div class="flex justify-between align-items-center w-full">
			<div class="ml-5">
				<i class="fas fa-bars"></i>
			</div>
			<div class="flex align-items-center space-x-2 mr-5">
				<i class="far fa-bell mt-2"></i>
				<div class="rounded-full h-7 w-7 bg-blue-200">
					<img src="https://image.freepik.com/free-photo/doctor-with-stethoscope-hands-hospital-background_1423-1.jpg"
					class="object-cover rounded-full h-full" 
					/>
				</div>
			</div>
		</div>
	)
}