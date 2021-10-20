import {clinicApi} from './../apis'
import axios from 'axios'
import{
	GET_REGISTRATIONS,
	SET_REGISTRATIONS,
	SET_USER_LOGIN,
	SET_PATIENT_DAY,
	SET_COMPLETED_TEST
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

export const setPatientThisDay = (payload) => ({
	type: SET_PATIENT_DAY,
	payload
})


export const getPatientByDay = () => {
	return (dispatch) => {
		return axios.get(`${baseUrl}/registrations/clinic/today`, {
			headers: {
				access_token: localStorage.access_token
			}
		})
			.then(({data}) => {
				dispatch(setPatientThisDay(data))
			})
			.catch(err => console.log(err))
	}
}