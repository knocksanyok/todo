import { type ChangeEvent, useEffect, useState } from 'react'
import Button from '@mui/material/Button'
import Input from '@mui/material/Input'
import { useAddTodoQueryMutation } from '../api/todoApi.ts'
import { useSnackbar } from 'notistack'

import { CircularProgress } from '@mui/material'

const TodosAddButtons = () => {
	const { enqueueSnackbar } = useSnackbar()

	const [newTodoTitle, setNewTodoTitle] = useState('')
	const [newTodoDescription, setNewTodoDescription] = useState('')

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	const handleAddTodo = () => {
		addTodoToBackend({ title: newTodoTitle, description: newTodoDescription })
	}

	const [addTodoToBackend, { isLoading, isError }] = useAddTodoQueryMutation()

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Error fetching todos', { variant: 'error' })
		}
	}, [isError, enqueueSnackbar])

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<>
			<Input placeholder={'title'} value={newTodoTitle} onChange={handleTitleChange} />
			<Input placeholder={'description'} value={newTodoDescription} onChange={handleDescriptionChange} />
			<Button disabled={!newTodoTitle} onClick={handleAddTodo}>
				Add
			</Button>
		</>
	)
}

export default TodosAddButtons
