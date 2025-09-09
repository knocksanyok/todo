import { createSlice } from '@reduxjs/toolkit'
import { mockTodos } from '../mockTodos.ts'

export const todosStore = createSlice({
	name: 'todos',
	initialState: {
		todos: mockTodos,
	},
	reducers: {
		addTodo: (state, actionNewTodo) => {
			state.todos = [actionNewTodo.payload, ...state.todos]
		},
		removeTodo: (state, actionToDoId) => {
			state.todos = state.todos.filter((t) => t._id !== actionToDoId.payload)
		},
		setTodo: (state, actionUpdateTodo) => {
			state.todos = state.todos.map((t) => (t._id === actionUpdateTodo.payload._id ? actionUpdateTodo.payload : t))
		},
	},
	selectors: {
		selectTodos: (state) => state.todos,
	},
})

export const { addTodo, removeTodo, setTodo } = todosStore.actions
export const { selectTodos } = todosStore.selectors
