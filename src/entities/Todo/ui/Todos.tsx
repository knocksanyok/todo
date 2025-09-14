import { CircularProgress, Container, Input, Stack } from '@mui/material'
import { Todo } from './Todo.tsx'
import { type ChangeEvent, useCallback, useEffect, useState } from 'react'
import Button from '@mui/material/Button'

import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectTodos, setTodos } from '../model/store/todosStore.ts'
import { addTodo, getTodos } from '../api/todoApi.ts'
import { useSnackbar } from 'notistack'
import { selectUser } from '../../User/model/store/userStore.ts'
import type { CreateTodoType } from '../model/todoType.ts'

const Todos = () => {
	const { enqueueSnackbar } = useSnackbar()

	const [newTodoTitle, setNewTodoTitle] = useState('')
	const [newTodoDescription, setNewTodoDescription] = useState('')

	const user = useAppSelector(selectUser)
	const todos = useAppSelector(selectTodos)
	const dispatch = useAppDispatch()

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	const handleGetTodos = useCallback(async () => {
		getTodos()
			.then((todos) => {
				dispatch(setTodos(todos.data || []))
			})
			.catch(() => {
				enqueueSnackbar('Error fetching todos', { variant: 'error' })
				dispatch(setTodos([]))
			})
			.finally(() => {
				setIsLoading(false)
			})
	}, [dispatch, enqueueSnackbar])

	const [isLoading, setIsLoading] = useState(true)

	const handleAddTodo = async () => {
		try {
			setIsLoading(true)
			if (!user?.access_token) return

			const newTodo: CreateTodoType = {
				title: newTodoTitle,
				description: newTodoDescription,
			}
			await addTodo(newTodo)
			await handleGetTodos()
		} catch (error) {
			enqueueSnackbar('Error adding todo', { variant: 'error' })
			console.error(error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		handleGetTodos()
	}, [handleGetTodos])

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
				{todos.map((todo) => {
					return <Todo todo={todo} />
				})}
			</Stack>
		</Container>
	)
}

export default Todos
