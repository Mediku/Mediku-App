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
	completed = completed.filter(e => e.test_result)
	let tested = complete.filter(e => e.is_tested && !e.test_result)
	let waiting = complete.filter(e => !e.is_tested && !e.test_result)

	return (
		<div className="flex space-x-11 mx-5">
			<div className="flex flex-col space-y-2 justify-center home-card w-60 h-36 bg-gradient-to-r from-blue-300 to-blue-500 rounded-lg p-2 shadow-lg">
				<p className="text-white font-bold">Today`s Patient</p>
				<div className="flex justify-between align-items-center">
					<i className="fas fa-users text-white text-xl"></i>
				</div>
				<p className="text-white">{patients.length}</p>
			</div>

			<div className="flex flex-col space-y-2 justify-center home-card w-60 h-36 bg-gradient-to-r from-green-300 to-green-500 rounded-lg p-2 shadow-lg">
				<p className="text-white font-bold">Completed Test</p>
				<div className="flex justify-between align-items-center">
					<i className="fas fa-clipboard-list text-white text-xl"></i>
				</div>
				<p className="text-white">{completed.length}</p>
			</div>

			<div className="flex flex-col space-y-2 justify-center home-card w-60 h-36 bg-gradient-to-r from-yellow-200 to-yellow-400 rounded-lg p-2 shadow-lg">
				<p className="text-white font-bold">Tested</p>
				<div className="flex justify-between align-items-center">
					<i className="fas fa-clipboard-list text-white text-xl"></i>
				</div>
				<p className="text-white">{tested.length}</p>
			</div>

			<div className="flex flex-col space-y-2 justify-center home-card w-60 h-36 bg-gradient-to-r from-red-300 to-red-500 rounded-lg p-2 shadow-lg">
				<p className="text-white font-bold">Waiting</p>
				<div className="flex justify-between align-items-center">
					<i className="fas fa-clipboard-list text-white text-xl"></i>
				</div>
				<p className="text-white">{waiting.length}</p>
			</div>


		</div>
	);
}