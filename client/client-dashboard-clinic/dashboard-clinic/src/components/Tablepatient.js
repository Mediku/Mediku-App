import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from "react-redux";
import { fetchPatientByDay } from "./../store/actions/";
import TableBodyHome from './TableBodyHome'

export default function Tablepatient() {
  const dispatch = useDispatch();
  const getName = localStorage.username;

  useEffect(() => {
    dispatch(fetchPatientByDay());
  }, [dispatch]);

	const patients = useSelector((state) => state.patientToday);

	return (
		<div class="flex flex-col mx-5 bg-white rounded-lg shadow-md">
			<p class="mx-5 my-3 text-md font-medium text-gray-900">Register Today</p>
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
								</tr>
							</thead>
							<tbody class="bg-white divide-y divide-gray-200">
							
							{
								patients?.map((patient, index) => {
									return(
										<TableBodyHome key={patient.id} patient={patient} index={index}/>
									)
								})
							}

							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}
