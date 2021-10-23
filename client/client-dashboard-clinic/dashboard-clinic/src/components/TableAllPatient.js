import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllPatientsAsync, updateTestResult } from "../store/actions/index.js";
import Swal from 'sweetalert2'
import moment from 'moment'

export default function TableAllPatient() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPatientsAsync());
  }, [dispatch]);

  const allPatients = useSelector((state) => state.allPatients);

  const getValueSelect = (e, id) => {
    Swal.fire({
      title: 'Updating Test Result',
      text: `User with id ${id.id}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, update and send email'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(updateTestResult(e.target.value, id.id))
        Swal.fire(
          'Success!',
          'Test result sent',
          'success'
        )
      }
    })
  }

  const SelectOption = (id) => {

    return (
      <select onChange={(e) => getValueSelect(e, id)} className="border-0 focus:ring-white">
        <option selected value='' disabled className="ring-white">--Update test result--</option>
        <option value='positive'>Positif</option>
        <option value='negative'>Negatif</option>
      </select>
    )
  }

  const TestResult = (result) => {
    if (result === 'positive') {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
          Positive
        </span>
      )
    } else if (result === 'negative') {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-gray-800">
          Negative
        </span>
      )
    } else {
      return (
        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-300 text-gray-500">
          
        </span>
      )
    }
  };

  return (
    <div className="flex flex-col mx-5 bg-white rounded-lg shadow-md">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    #
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Service
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Result
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Test date
                  </th>
                  <th scope="col" className="relative px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {
                  allPatients.map((patient, index) => {

                    return (
                      <tr>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">{index + 1}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div>
                              <div className="text-sm font-medium text-gray-900">
                                {patient.User.full_name}
                              </div>
                              <div className="text-sm text-gray-500">
                                {patient.User.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            SWAB
                          </div>
                          <div className="text-sm text-gray-500">
                            {patient.service_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {
                            (patient.is_tested === false && patient.test_result === null) ?
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-gray-100 text-gray-800">
                                Waiting
                              </span>
                              :
                              (patient.is_tested === true && patient.test_result === null) ?
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-500 text-white">
                                  Tested
                                </span>
                                :
                                <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                  Completed
                                </span>
                          }
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {
                            (patient.is_tested === true && patient.test_result === null) ?
                              <SelectOption id={patient.id} /> :
                              TestResult(patient?.test_result)
                          }
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {moment(patient.date).format('ll')}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="#"
                            className="text-indigo-600 hover:text-indigo-900"
                          ></a>
                        </td>
                        {
                          patient.is_tested === false ? (
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Link
                                to={`/process/${patient.id}`}
                                className="text-indigo-600 hover:text-indigo-900"
                              >
                                <i className="fas fa-exchange-alt"></i> Process
                              </Link>
                            </td>
                          ) : (
                            ""
                          )
                        }
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
