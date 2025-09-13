import { rootApi } from '../../../shared/api/rootApi.ts'
import type { CreateTodoType, TodoType } from '../model/todoType.ts'

export const getTodos = async (token?: string) => {
	return await rootApi.get<TodoType[]>(`/todos`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}

export const addTodo = async (todo: CreateTodoType, token?: string) => {
	return await rootApi.post<TodoType>('/todos', todo, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	})
}
