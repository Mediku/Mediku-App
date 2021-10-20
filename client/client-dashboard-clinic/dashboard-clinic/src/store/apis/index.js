import axios from 'axios'

export const clinicApi = axios.create({
	baseURL: 'http://localhost:9000'
})

