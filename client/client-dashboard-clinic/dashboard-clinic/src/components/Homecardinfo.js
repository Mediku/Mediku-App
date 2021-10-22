import React, { useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { getCompletedTest, fetchAllPatientsAsync } from './../store/actions/'

export default function Homecardinfo() {
	const dispatch = useDispatch()
	const patients = useSelector((state) => state.patientToday)

	useEffect(() => {
		dispatch(fetchAllPatientsAsync());
	}, [dispatch]);

	useEffect(() => {
		dispatch(getCompletedTest())
	}, [dispatch])

	const complete = useSelector((state) => state.allPatients)
	let completed = [...complete]
	completed = completed.filter(e => e.test_result !== null)
	let tested = complete.filter(e => e.is_tested)
	let waiting = complete.filter(e => e.is_tested === true && e.test_result === null)

	return (
		<div class="flex space-x-11 mx-5">
			<div class="flex flex-col space-y-2 justify-center home-card w-60 h-36 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg p-2 shadow-lg">
				<p class="text-white font-bold">Today`s Patient</p>
				<div class="flex justify-between align-items-center">
					<i class="fas fa-users text-white text-xl"></i>
				</div>
				<p class="text-white">{patients.length}</p>
			</div>

			<div class="flex flex-col space-y-2 justify-center home-card w-60 h-36 bg-gradient-to-r from-green-300 to-green-500 rounded-lg p-2 shadow-lg">
				<p class="text-white font-bold">Completed Test</p>
				<div class="flex justify-between align-items-center">
					<i class="fas fa-clipboard-list text-white text-xl"></i>
				</div>
				<p class="text-white">{completed.length}</p>
			</div>

			<div class="flex flex-col space-y-2 justify-center home-card w-60 h-36 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-lg p-2 shadow-lg">
				<p class="text-white font-bold">Tested</p>
				<div class="flex justify-between align-items-center">
					<i class="fas fa-clipboard-list text-white text-xl"></i>
				</div>
				<p class="text-white">{tested.length}</p>
			</div>

			<div class="flex flex-col space-y-2 justify-center home-card w-60 h-36 bg-gradient-to-r from-red-300 to-red-500 rounded-lg p-2 shadow-lg">
				<p class="text-white font-bold">Waiting</p>
				<div class="flex justify-between align-items-center">
					<i class="fas fa-clipboard-list text-white text-xl"></i>
				</div>
				<p class="text-white">{waiting.length}</p>
			</div>


		</div>
	);
}