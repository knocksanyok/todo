import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { mockTodos } from '../mockTodos.ts'
import type { TodoType } from '../todoType.ts'

type TodosStore = {
	todos: TodoType[]
	addTodo: (newTodo: TodoType) => void
	setTodo: (todo: TodoType) => void
	removeTodo: (id: TodoType['_id']) => void
}

export const useTodosStore = create<TodosStore>()(
	devtools((set) => {
		return {
			todos: mockTodos,
			addTodo: (newTodo: TodoType) => set((state) => ({ todos: [newTodo, ...state.todos] })),
			setTodo: (updatedTodo: TodoType) =>
				set((state) => ({
					todos: state.todos.map((t) => (t._id === updatedTodo._id ? updatedTodo : t)),
				})),
			removeTodo: (removeTodo: TodoType['_id']) =>
				set((state) => ({
					todos: state.todos.filter((t) => t._id !== removeTodo),
				})),
		}
	})
)
