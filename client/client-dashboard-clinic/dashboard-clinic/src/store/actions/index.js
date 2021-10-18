import{
	GET_REGISTRATIONS,
	SET_REGISTRATIONS
} from './../keys'

const baseUrl = 'http://localhost:9000'

export const setRegistration = (payload) => {
	type: SET_REGISTRATIONS,
	payload
}