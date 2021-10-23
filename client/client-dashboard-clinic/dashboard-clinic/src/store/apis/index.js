import axios from 'axios'

export const clinicApi = axios.create({
	baseURL: 'https://mediku-app-server.herokuapp.com'
})

