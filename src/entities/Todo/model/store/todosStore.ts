import { createSlice } from '@reduxjs/toolkit'
import type { TodoType } from '../todoType.ts'

type TodosType = {
	todos: TodoType[]
}

const initialState: TodosType = {
	todos: [],
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
	},
	selectors: {
		selectTodos: (state) => state.todos,
	},
})

export const { addTodoToStore, removeTodoFromStore, setTodo, setTodos } = todosStore.actions
export const { selectTodos } = todosStore.selectors
