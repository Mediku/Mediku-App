import React from 'react'
import Table from './../components/TableAllPatient'
import Header from './../components/Header'
import Sidebar from './../components/Sidebar'
import FilterNav from './../components/FilterNav'

export default function AllPatient() {
	return (
		<div className="flex min-h-screen flex">
			<Sidebar />
			<div className="flex flex-col space-y-5 py-5 w-full">
				<Header />
				<div className="flex flex-col w-full bg-gray-100 space-y-5 shadow-md">
					<div className="mx-5 mt-5">
						<p className="font-bold font-xl">Dashboard <span className="text-gray-300">|</span> <span className="text-sm font-light">Registered patients</span></p>
					</div>
					<div className="mx-3 mt-5">
						<FilterNav />
					</div>
					<Table />
				</div>
			</div>
		</div>
	)
}