import {
	GET_REGISTRATIONS,
	SET_REGISTRATIONS,
	SET_USER_LOGIN
} from './../keys'

let initialState = {
	registrations : [],
	login: false
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

		default:
		return state
	}
}

export default reducer