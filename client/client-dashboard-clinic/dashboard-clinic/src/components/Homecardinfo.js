import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from 'react-redux'
import { setCompletedtest } from './../store/actions/'

export default function Homecardinfo() {
	const patients = useSelector((state) => state.patientToday)
	/*const dispatch = useDispatch()
	useEffect(() => {
		dispatch(setCompletedtest())
	}, [dispatch])
	const completed = useSelector((state) => state.completed) */

	return (
		<div class="flex space-x-5 mx-5">
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
				<p class="text-white">{}</p>
			</div>

		</div>
	);
}