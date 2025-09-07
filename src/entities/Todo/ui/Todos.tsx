import { Container, Input, Stack } from '@mui/material'
import { useTodosStore } from '../model/store/useTodosStore.ts'
import { Todo } from './Todo.tsx'
import { type ChangeEvent, useState } from 'react'
import Button from '@mui/material/Button'
import type { TodoType } from '../model/todoType.ts'

const Todos = () => {
	const [newTodoTitle, setNewTodoTitle] = useState('')
	const [newTodoDescription, setNewTodoDescription] = useState('')

	const todos = useTodosStore((state) => state.todos)
	const addTodos = useTodosStore((state) => state.addTodo)

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
		addTodos(newTodo)
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
