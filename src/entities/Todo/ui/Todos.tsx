import { CircularProgress, Container, Input, Stack } from '@mui/material'
import { Todo } from './Todo.tsx'
import { type ChangeEvent, useEffect, useState } from 'react'
import Button from '@mui/material/Button'

import { useAddTodoQueryMutation, useGetTodosQuery } from '../api/todoApi.ts'
import { useSnackbar } from 'notistack'
import { useAppSelector } from '../../../app/store.ts'
import { selectFilters } from '../model/store/todosStore.ts'
import { selectUser } from '../../User/model/store/userStore.ts'

const Todos = () => {
	const { enqueueSnackbar } = useSnackbar()
	const filters = useAppSelector(selectFilters)
	const user = useAppSelector(selectUser)

	const [newTodoTitle, setNewTodoTitle] = useState('')
	const [newTodoDescription, setNewTodoDescription] = useState('')

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	const {
		data,
		isLoading: isGettingTodos,
		isError: isGettingError,
	} = useGetTodosQuery(filters, {
		skip: !user?.access_token,
		pollingInterval: 5000,
	})

	const [addTodoToBackend, { isLoading: isAddingTodo, isError: isAddingError }] = useAddTodoQueryMutation()

	const isLoading = isAddingTodo || isGettingTodos
	const isError = isGettingError || isAddingError

	const handleAddTodo = () => {
		addTodoToBackend({ title: newTodoTitle, description: newTodoDescription })
	}

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Error fetching todos', { variant: 'error' })
		}
	}, [isError, enqueueSnackbar])

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<Container>
			<Input placeholder={'title'} value={newTodoTitle} onChange={handleTitleChange} />
			<Input placeholder={'description'} value={newTodoDescription} onChange={handleDescriptionChange} />
			<Button disabled={!newTodoTitle} onClick={handleAddTodo}>
				Add
			</Button>

			<Stack flexWrap={'wrap'} spacing={2} direction={'row'}>
				{data?.map((todo) => {
					return <Todo todo={todo} />
				})}
			</Stack>
		</Container>
	)
}

export default Todos
