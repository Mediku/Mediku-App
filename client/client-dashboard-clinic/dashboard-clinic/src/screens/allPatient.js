import React from 'react'
import Table from './../components/tableAllPatient'
import Header from './../components/header'
import Sidebar from './../components/sidebar'

export default function allPatient() {
	return (
		<div class="flex min-h-screen flex">
			<Sidebar />
			<div class="flex flex-col space-y-5 py-5 w-full">
				<Header />
				<div class="flex flex-col w-full bg-gray-100 space-y-5 shadow-md">
					<div class="mx-5 mt-5">
						<p class="font-bold font-xl">Dashboard <span class="text-gray-300">|</span> <span class="text-sm font-light">Registered patients</span></p>
					</div>
					<Table />
				</div>

			</div>
		</div>
	)
}