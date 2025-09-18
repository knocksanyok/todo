import { rootApi } from '../../../shared/api/rootApi.ts'
import type { CreateTodoType, TodoType, UpdateTodoType } from '../model/todoType.ts'
import type { TodosType } from '../model/store/todosStore.ts'

export const getAllTodos = async () => {
	return await rootApi.get<TodoType[]>('/todos')
}

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

//RTQ Логика

import { rtkApi } from './rtkApi.ts'

const getQueryParams = (filters: TodosType['filters']) => {
	let queryParams = `?page=${filters.page}&limit=${filters.limit}`

	if (filters.completed !== 'all') {
		queryParams += `&completed=${filters.completed}`
	}
	if (filters.search) {
		queryParams += `&search=${filters.search}`
	}
	return queryParams
}

export const todoApiRTK = rtkApi.injectEndpoints({
	endpoints: (builder) => ({
		getTodos: builder.query<TodoType[], TodosType['filters']>({
			query: (filters) => {
				const queryParams = getQueryParams(filters)
				return `/todos${queryParams}`
			},
			providesTags: ['Todo'],
		}),
		getTodoById: builder.query<TodoType, string>({
			query: (todoId) => ({
				url: `/todos/${todoId}`,
			}),
			providesTags: ['Todo'],
		}),
		getAllTodos: builder.query<TodoType[], void>({
			query: () => ({
				url: `/todos/`,
			}),
			providesTags: ['Todo'],
		}),
		addTodoQuery: builder.mutation<TodoType, CreateTodoType>({
			query: (createTodo) => ({
				url: `/todos/`,
				method: `POST`,
				body: createTodo,
			}),
			invalidatesTags: ['Todo'],
		}),
		deleteTodoQuery: builder.mutation<void, string>({
			query: (todoId) => ({
				url: `/todos/${todoId}`,
				method: `DELETE`,
			}),
			invalidatesTags: ['Todo'],
		}),
		updateTodoQuery: builder.mutation<void, UpdateTodoType>({
			query: (updateTodo) => ({
				url: `todos/${updateTodo._id}`,
				method: `PATCH`,
				body: updateTodo,
			}),
			invalidatesTags: ['Todo'],
		}),
	}),
})

export const {
	useGetTodosQuery,
	useGetTodoByIdQuery,
	useGetAllTodosQuery,
	useAddTodoQueryMutation,
	useDeleteTodoQueryMutation,
	useUpdateTodoQueryMutation,
} = todoApiRTK
