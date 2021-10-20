import {
	GET_REGISTRATIONS,
	SET_REGISTRATIONS,
	SET_USER_LOGIN,
	SET_PATIENT_DAY
} from './../keys'

let initialState = {
	registrations : [],
	login: false,
	patientToday: []
}
function reducer(state=initialState, action){
	
	const {type, payload} = action
	switch(type){

		case GET_REGISTRATIONS:
		return state.registrations
		break

		case SET_REGISTRATIONS:
		return {...state, registrations: payload}
		break

		case SET_USER_LOGIN:
		return {...state, login: true}
		break

		case SET_PATIENT_DAY:
		return {...state, patientToday: payload}
		break

		default:
		return state
	}
}

export default reducer