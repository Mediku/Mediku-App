import React from 'react'
import Sidebar from './../components/sidebar'
import Header from './../components/header'
import Table from './../components/tablepatient'
import Card from './../components/homecardinfo'

export default function Home() {
	return (
		<div class="flex min-h-screen flex">
			<Sidebar />
			<div class="flex flex-col space-y-5 py-5 w-full">

				<Header />
				<div class="flex flex-col w-full bg-gray-100 space-y-5 shadow-md">
					<div class="mx-5 mt-5">
						<p class="font-bold">Dashboard</p>
					</div>
					<Card />
					<Table />
				</div>

			</div>
		</div>
	)
}