import axios from 'axios'
import { store } from '../../app/store.ts'

export const rootApi = axios.create({
	baseURL: 'https://todos-be.vercel.app',
})

rootApi.interceptors.request.use((config) => {
	const state = store.getState()
	const token = state.user.user?.access_token
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})
