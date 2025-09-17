import { configureStore } from '@reduxjs/toolkit'
import { userStore } from '../entities/User/model/store/userStore.ts'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { todosStore } from '../entities/Todo/model/store/todosStore.ts'
import { rtkApi } from '../entities/Todo/api/rtkApi.ts'

export const store = configureStore({
	reducer: {
		[userStore.name]: userStore.reducer,
		[todosStore.name]: todosStore.reducer,
		[rtkApi.reducerPath]: rtkApi.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(rtkApi.middleware),
})

export type AppStore = typeof store
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
