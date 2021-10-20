import React from 'react'
import { Link } from 'react-router-dom'
export default function FormProcess() {
	return (
		<div>
			<div class="mx-5">
			  <div class="md:grid md:gap-6">
			    <div class="mt-5 md:mt-0 md:col-span-2">
			      <form action="#" method="POST">
			        <div class="shadow sm:rounded-md sm:overflow-hidden">
			          <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
			            <div class="grid grid-cols-3 gap-6">
			              <div class="col-span-3 sm:col-span-2">
			                <label for="company-website" class="block text-sm font-medium text-gray-700">
			                  Name
			                </label>
			                <div class="mt-1 flex rounded-md shadow-sm">
			                  <input type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300" value="John Doe" />
			                </div>
			              </div>
			            </div>

			            <div class="grid grid-cols-3 gap-6">
			              <div class="col-span-3 sm:col-span-2">
			                <label for="company-website" class="block text-sm font-medium text-gray-700">
			                  Phone Number
			                </label>
			                <div class="mt-1 flex rounded-md shadow-sm">
			                  <input type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300" value="085870654177" />
			                </div>
			              </div>
			            </div>

			            <div class="grid grid-cols-3 gap-6">
			              <div class="col-span-3 sm:col-span-2">
			                <label for="company-website" class="block text-sm font-medium text-gray-700">
			                  Identity Card Number
			                </label>
			                <div class="mt-1 flex rounded-md shadow-sm">
			                  <input type="number" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300" value="3402021709940001" />
			                </div>
			              </div>
			            </div>

			            <div class="grid grid-cols-3 gap-6">
			            	<div class="col-span-3 sm:col-span-2">
			            		<label for="company-website" class="block text-sm font-medium text-gray-700">
			            			Birth Date
			            		</label>
			            		<div class="mt-1 flex rounded-md shadow-sm">
			            			<input type="text" name="company-website" id="company-website" class="focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded-none rounded-md sm:text-sm border-gray-300" value="17/09/1994" />
			            		</div>
			            	</div>
			            </div>

			            <div>
			              <label for="about" class="block text-sm font-medium text-gray-700">
			                Address (Based on identity card)
			              </label>
			              <div class="mt-1">
			                <textarea id="about" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" value="Jl Juragan Sinda 1, Kukusan, Beji, Depok, Jawa Barat"></textarea>
			              </div>
			              <p class="mt-2 text-sm text-gray-500">
			                Addres based on identity card
			              </p>
			            </div>

			            <div>
			            	<label for="about" class="block text-sm font-medium text-gray-700">
			            		Address (Domicile)
			            	</label>
			            	<div class="mt-1">
			            		<textarea id="about" name="about" rows="3" class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md" value="Jl Juragan Sinda 1, Kukusan, Beji, Depok, Jawa Barat"></textarea>
			            	</div>
			            	<p class="mt-2 text-sm text-gray-500">
			            		Domicile
			            	</p>
			            </div>

			          </div>
			          <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
			          	<Link to='/'>
			            <button type="submit" class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
			              Confirm and process
			            </button>
			            </Link>
			          </div>
			        </div>
			      </form>
			    </div>
			  </div>
			</div>
		</div>
	)
}
