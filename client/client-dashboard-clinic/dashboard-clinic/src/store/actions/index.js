import {clinicApi} from './../apis'
import axios from 'axios'
import{
	GET_REGISTRATIONS,
	SET_REGISTRATIONS,
	SET_USER_LOGIN
} from './../keys'

const baseUrl = 'http://localhost:9000'

export const setRegistration = (payload) => ({
	type: SET_REGISTRATIONS,
	payload
})

export const setUserLogin = (payload) => ({
	type: SET_USER_LOGIN,
	payload
})

export const userLogin = (payload) => {
	return (dispatch) => {
		return axios.post(`${baseUrl}/clinic/login`, payload)
	}
}