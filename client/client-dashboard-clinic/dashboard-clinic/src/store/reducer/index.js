
import {
	GET_REGISTRATIONS
} from './../keys'

let initialState = {
	registrations : [],
}
export default function reducer(state=initialState, action){
	const {type, payload} = action

	switch(type){

		case GET_REGISTRATIONS:
		return {...state, registrations : []}

		default:
		return state
	}

}