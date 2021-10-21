import React from 'react'
import { Link } from 'react-router-dom'


export default function TableBodyHome({patient, index}) {

	const Status = () => {
		
		if (patient.is_tested === false) {
			return(
				<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-500">
					Waiting
				</span>
			)
		}else {
			if (patient.test_result === null) {
				return(
					<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-white-800">
						Waiting
					</span>
				)
			}else{
				return(
					<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
						Completed
					</span>
				)
			}
		}
	}

	const TestResult = () => {
		{
			if (!patient.test_result) {
				return(
					<p>Waiting</p>
				)
			}else {
				return(
					<p>{patient.test_result}</p>
				)
			}
		}
	}

	const Process = () => {
		{
			if (!patient.is_tested) {
				return(
					<p>test</p>
				)
			}else{	
				return(
					<Link to='/process?name=John'
						class="text-indigo-600 hover:text-indigo-900"
					>
						"process"
					</Link>
				)
			}
		}
	}


return (
	<tr key={index}>
		<td class="px-6 py-4 whitespace-nowrap">
			<div class="text-sm text-gray-900">
				{index + 1}
			</div>
		</td>	
		<td class="px-6 py-4 whitespace-nowrap">
			<div class="flex items-center">
				<div>
					<div class="text-sm font-medium text-gray-900">
						{patient.User.full_name}
					</div>
					<div class="text-sm text-gray-500">
						{patient.User.full_name}
					</div>
				</div>
			</div>
		</td>
		<td class="px-6 py-4 whitespace-nowrap">
			<div class="text-sm text-gray-900">
				SWAB
			</div>
			<div class="text-sm text-gray-500">
				{patient.service_name}
			</div>
		</td>
		<td class="px-6 py-4 whitespace-nowrap">
			<Status />
		</td>
		<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				<TestResult />
		</td>
		<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
			<a
				href="#"
				class="text-indigo-600 hover:text-indigo-900"
			>
			</a>
		</td>
	</tr>
	)
}