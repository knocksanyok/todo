import { rootApi } from '../../../shared/api/rootApi.ts'
import type { CreateTodoType, TodoType } from '../model/todoType.ts'
import type { TodosType } from '../model/store/todosStore.ts'

export const getTodos = async (filters: TodosType['filters']) => {
	let queryParams = `?page=${filters.page}&limit=${filters.limit}`

	if (filters.completed !== 'all') {
		queryParams += `&completed=${filters.completed}`
	}
	if (filters.search) {
		queryParams += `&search=${filters.search}`
	}
	return await rootApi.get<TodoType[]>(`/todos${queryParams}`)
}

export const addTodo = async (todo: CreateTodoType) => {
	return await rootApi.post<TodoType>('/todos', todo)
}

export const deleteTodo = async (todoId: string) => {
	return await rootApi.delete<TodoType>(`/todos/${todoId}`)
}

export const updateTodo = async (
	todoId: string,
	data: { title?: string; description?: string; completed?: boolean; order?: number }
) => {
	return await rootApi.patch<TodoType>(`/todos/${todoId}`, data)
}

export const getTodoById = async (todoId: string) => {
	return await rootApi.get<TodoType>(`/todos/${todoId}`)
}
