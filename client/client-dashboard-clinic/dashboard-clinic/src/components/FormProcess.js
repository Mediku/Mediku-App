import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchPatientAsync, changeIsTested, fetchAllPatientsAsync } from "../store/actions";
import Swal from 'sweetalert2'

export default function FormProcess() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const history = useHistory()
  const dataId = +id;
  useEffect(() => {
    dispatch(fetchPatientAsync(dataId));
  }, [dispatch]);
  const dataPatient = useSelector((state) => state.dataPatient);

  const handleIsTested = (e) => {
    e.preventDefault()

    Swal.fire({
      title: `Confirm`,
      text: `User with id ${dataPatient.id} is ready to test`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, change status to tested'
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(changeIsTested(dataId))
          .then(({ data }) => {
            dispatch(fetchAllPatientsAsync())
            history.push('/patients')
          })
          .catch((err) => console.log(err, 'err dari actions'));

        Swal.fire(
          'Success!',
          'User already tested',
          'success'
        )
      }
    })
  }

  return (
    <div>
      <div className="mx-5">
        <div className="md:grid md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form onSubmit={(e) => handleIsTested(e)}>
              <div className="shadow sm:rounded-md sm:overflow-hidden">
                <div className="px-4 py-5 bg-white space-y-6 sm:p-6">
                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        for="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Name
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300"
                          value={dataPatient?.User?.full_name}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        for="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Phone Number
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300"
                          value={dataPatient?.User?.phone_number}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        for="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Identity Card Number
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="number"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300"
                          value={dataPatient?.User?.identity_card_number}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-6">
                    <div className="col-span-3 sm:col-span-2">
                      <label
                        for="company-website"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Birth Date
                      </label>
                      <div className="mt-1 flex rounded-md shadow-sm">
                        <input
                          type="text"
                          name="company-website"
                          id="company-website"
                          className="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300"
                          value={dataPatient?.User?.date_of_birth}
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <label
                      for="about"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Address (Based on identity card)
                    </label>
                    <div className="mt-1">
                      <textarea
                        id="about"
                        name="about"
                        rows="3"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        value={`RT ${dataPatient?.User?.RT}, RW ${dataPatient?.User?.RW}, ${dataPatient?.User?.sub_district},${dataPatient?.User?.sub_district},${dataPatient?.User?.regency},${dataPatient?.User?.province}`}
                      ></textarea>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Domicile</p>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Confirm and process
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
