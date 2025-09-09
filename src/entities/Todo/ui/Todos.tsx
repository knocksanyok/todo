import { Container, Input, Stack } from '@mui/material'
import { Todo } from './Todo.tsx'
import { type ChangeEvent, useState } from 'react'
import Button from '@mui/material/Button'
import type { TodoType } from '../model/todoType.ts'

import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { addTodo, selectTodos } from '../model/store/todosStore.ts'

const Todos = () => {
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const [newTodoDescription, setNewTodoDescription] = useState('')

	const todos = useAppSelector(selectTodos)
	const dispatch = useAppDispatch()

	const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoTitle(e.target.value)
	}

	const handleDescriptionChange = (e: ChangeEvent<HTMLInputElement>) => {
		setNewTodoDescription(e.target.value)
	}

	const handleAddTodo = () => {
		const newTodo: TodoType = {
			_id: Date.now().toString(),
			title: newTodoTitle,
			description: newTodoDescription,
			completed: false,
			createdAt: new Date().toISOString(),
			updatedAt: new Date().toISOString(),
			order: todos.length + 1,
		}
		dispatch(addTodo(newTodo))
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
