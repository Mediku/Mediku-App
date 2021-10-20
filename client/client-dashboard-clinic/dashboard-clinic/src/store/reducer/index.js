import {
	GET_REGISTRATIONS,
	SET_REGISTRATIONS,
	SET_USER_LOGIN,
	SET_PATIENT_DAY,
	SET_COMPLETED_TEST,
} from './../keys'

let initialState = {
	registrations : [],
	login: false,
	patientToday: [],
	completed: 0
}
function reducer(state=initialState, action){
	
	const {type, payload} = action
	switch(type){

		case GET_REGISTRATIONS:
		return state.registrations

		case SET_REGISTRATIONS:
		return {...state, registrations: payload}

		case SET_USER_LOGIN:
		return {...state, login: true}

		case SET_PATIENT_DAY:
		return {...state, patientToday: payload}

		default:
		return state
	}
}

export default reducer