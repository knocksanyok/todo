import { createSlice } from '@reduxjs/toolkit'
import type { UserType } from '../userType.ts'

type UserStore = {
	user: null | UserType
	isLoading: boolean
}

const initialState: UserStore = {
	user: null,
	isLoading: false,
}

export const userStore = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		setUser: (state, action) => {
			state.user = action.payload
		},
		removeUser: (state) => {
			state.user = null
		},
		setIsLoading: (state, action) => {
			state.isLoading = action.payload
		},
	},
	selectors: {
		selectUser: (state: UserStore) => {
			return state.user
		},
		selectIsLoading: (state) => state.isLoading,
	},
})

export const { setUser, removeUser, setIsLoading } = userStore.actions
export const { selectUser, selectIsLoading } = userStore.selectors
