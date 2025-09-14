import { rootApi } from '../../../shared/api/rootApi.ts'
import type { CreateTodoType, TodoType } from '../model/todoType.ts'

export const getTodos = async () => {
	return await rootApi.get<TodoType[]>(`/todos`)
}

export const addTodo = async (todo: CreateTodoType) => {
	return await rootApi.post<TodoType>('/todos', todo)
}

export const deleteTodo = async (id: string) => {
	return await rootApi.delete(`/todos/${id}`)
}

export const updateTodo = async (
	id: string,
	data: { title?: string; description?: string; completed?: boolean; order?: number }
) => {
	return await rootApi.patch(`/todos/${id}`, data)
}
