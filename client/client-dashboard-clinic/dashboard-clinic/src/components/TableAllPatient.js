import React from 'react'
import { Link } from 'react-router-dom'

export default function TableAllPatient() {

	return (
		<div class="flex flex-col mx-5 bg-white rounded-lg shadow-md">
			<div class="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
				<div class="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
					<div class="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
						<table class="min-w-full divide-y divide-gray-200">
							<thead class="bg-gray-50">
								<tr>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										#
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Name
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Service
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Status
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Result
									</th>
									<th
										scope="col"
										class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
									>
										Test date
									</th>
									<th scope="col" class="relative px-6 py-3">
										<span class="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
								<tr>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm text-gray-900">
											1
										</div>
									</td>	
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex items-center">
											<div>
												<div class="text-sm font-medium text-gray-900">
													Jane Cooper
												</div>
												<div class="text-sm text-gray-500">
													jane.cooper@example.com
												</div>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm text-gray-900">
											SWAB
										</div>
										<div class="text-sm text-gray-500">
											Antigen
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
											Completed
										</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										Negative
									</td>

									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										17/10/2021
									</td>

									<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<a
											href="#"
											class="text-indigo-600 hover:text-indigo-900"
										>
										</a>
									</td>
								</tr>

								<tr>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm text-gray-900">
											2
										</div>
									</td>	
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex items-center">
											<div>
												<div class="text-sm font-medium text-gray-900">
													Jane Cooper
												</div>
												<div class="text-sm text-gray-500">
													jane.cooper@example.com
												</div>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm text-gray-900">
											SWAB
										</div>
										<div class="text-sm text-gray-500">
											Antigen
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-gray-800">
											Tested
										</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										waiting
									</td>

									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										17/10/2021
									</td>

									<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<a
											href="#"
											class="text-indigo-600 hover:text-indigo-900"
										>
											
										</a>
									</td>
								</tr>

								<tr>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm text-gray-900">
											3
										</div>
									</td>	
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="flex items-center">
											<div>
												<div class="text-sm font-medium text-gray-900">
													Jane Cooper
												</div>
												<div class="text-sm text-gray-500">
													jane.cooper@example.com
												</div>
											</div>
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<div class="text-sm text-gray-900">
											SWAB
										</div>
										<div class="text-sm text-gray-500">
											Antigen
										</div>
									</td>
									<td class="px-6 py-4 whitespace-nowrap">
										<span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-gray-800">
											Waiting
										</span>
									</td>
									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										waiting
									</td>

									<td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										17/10/2021
									</td>

									<td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
										<Link to='/process?name=John'
											class="text-indigo-600 hover:text-indigo-900"
										>
											<i class="fas fa-exchange-alt"></i>  Process
										</Link>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	)
}