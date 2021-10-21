import React from 'react'
import { Link } from 'react-router-dom'


export default function TableBodyHome({ patient, index }) {
	const Status = () => {
		if (!patient.is_tested) {
			return (
				"Waiting"
			)
		} else {
			return (
				"completed"
			)
		}
	}

	const TestResult = () => {
		{
			if (!patient.test_result) {
				return (
					"Waiting"
				)
			} else {
				return (
					"result"
				)
			}
		}
	}

	const Process = () => {
		{
			if (!patient.is_tested) {
				return (
					""
				)
			} else {
				return (
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
				<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
					<Status status={patient.is_tested} />
				</span>
			</td>
			<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
				<TestResult result={patient.test_result} />
			</td>
			<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
				<a
					href="#"
					class="text-indigo-600 hover:text-indigo-900"
				>
				</a>
			</td>

			<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
				<Process />
			</td>

		</tr>
	)
}