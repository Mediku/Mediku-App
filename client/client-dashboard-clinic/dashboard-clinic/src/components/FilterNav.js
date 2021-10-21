import React from 'react'
import {setFiltered} from './../store/actions/'
import { useDispatch } from 'react-redux'

export default function FilterNav() {
	const dispatch = useDispatch()

	const Filtering = (filter) => {
		dispatch(setFiltered(filter))
	}

	return (
		<div class="flex space-x-2 w-full px-3">
			<div class="inline-flex">
			  <button 
			  	onClick={() => Filtering('completed')}
			  	class="text-sm bg-green-100 text-green-800 hover:bg-gray-200 font-bold py-2 px-4 rounded-l">
			    Completed
			  </button>
			  <button 
			  	onClick={() => Filtering('tested')}
			  	class="text-sm bg-blue-300 text-gray-800 hover:bg-gray-200 font-bold py-2 px-4 rounded-r">
			    Tested
			  </button>
			  <button 
			  	onClick={() => Filtering('waiting')}
			  	class="text-sm bg-gray-300 text-gray-500 hover:bg-gray-200 font-bold py-2 px-4 rounded-r">
			    Waiting
			  </button>
			</div>
		</div>
	)
}