import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { mockTodos } from '../mockTodos.ts'
import type { TodoType } from '../todoType.ts'

type TodosStore = {
	todos: TodoType[]
	addTodo: (newTodo: TodoType) => void
	setTodos: (todos: TodoType[]) => void
	removeTodo: (id: TodoType['_id']) => void
}

export const useTodosStore = create<TodosStore>()(
	devtools((set) => {
		return {
			todos: mockTodos,
			addTodo: (newTodo: TodoType) => set((state) => ({ todos: [newTodo, ...state.todos] })),
			setTodos: (todos: TodoType[]) => set({ todos }),
			removeTodo: (removeTodo: TodoType['_id']) =>
				set((state) => ({
					todos: state.todos.filter((t) => t._id !== removeTodo),
				})),
		}
	})
)
