import { createSlice, type PayloadAction } from '@reduxjs/toolkit'
import type { TodoType } from '../todoType.ts'

export type TodosType = {
	todos: TodoType[]
	todosAllCount: number
	filters: {
		completed: 'true' | 'false' | 'all'
		page: number
		limit: number
		search?: string
	}
}

const initialState: TodosType = {
	todos: [],
	todosAllCount: 0,
	filters: {
		limit: 5,
		page: 1,
		completed: 'all',
	},
}

export const todosStore = createSlice({
	name: 'todos',
	initialState,
	reducers: {
		addTodoToStore: (state, actionNewTodo) => {
			state.todos = [actionNewTodo.payload, ...state.todos]
		},
		removeTodoFromStore: (state, actionToDoId) => {
			state.todos = state.todos.filter((t) => t._id !== actionToDoId.payload)
		},
		setTodo: (state, actionUpdateTodo) => {
			state.todos = state.todos.map((t) => (t._id === actionUpdateTodo.payload._id ? actionUpdateTodo.payload : t))
		},
		setTodos: (state, actionUpdateTodos) => {
			state.todos = actionUpdateTodos.payload
		},
		setLimit: (state, action) => {
			state.filters.limit = action.payload
		},
		setPage: (state, action) => {
			state.filters.page = action.payload
		},
		setCompletedFilter: (state, action: PayloadAction<'all' | 'true' | 'false'>) => {
			state.filters.completed = action.payload
		},
		setSearch: (state, action) => {
			state.filters.search = action.payload
		},
		setTodosCount: (state, action: PayloadAction<number>) => {
			state.todosAllCount = action.payload
		},
	},
	selectors: {
		selectTodos: (state) => state.todos,
		selectFilters: (state) => state.filters,
		selectTodosCount: (state) => state.todosAllCount,
	},
})

export const {
	addTodoToStore,
	removeTodoFromStore,
	setTodo,
	setTodos,
	setLimit,
	setPage,
	setCompletedFilter,
	setSearch,
	setTodosCount,
} = todosStore.actions
export const { selectTodos, selectFilters, selectTodosCount } = todosStore.selectors
