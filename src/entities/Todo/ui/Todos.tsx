import { Card, CardActions, CardContent, Checkbox, Stack } from '@mui/material'
import Typography from '@mui/material/Typography'
import type { TodoType } from '../model/todoType.ts'
import { mockTodos } from '../model/mockTodos.ts'
import { useState } from 'react'

type TodoProps = {
	todo: TodoType
	setTodo: (todo: TodoType) => void
}

const Todo = ({ todo, setTodo }: TodoProps) => {
	const handleCheckClick = () => {
		setTodo({ ...todo, completed: !todo.completed })
	}
	return (
		<Card variant="outlined" sx={{ maxWidth: 200 }}>
			<CardContent
				sx={{
					display: 'grid',
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
					gap: 3,
				}}
			>
				<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
					{todo.title}
				</Typography>
				<Typography variant="body2">{todo.description}</Typography>
				<Typography>{`Дата создания: ${new Date(todo.updatedAt).toLocaleDateString()}`}</Typography>
				<Typography>{`Дата обновления: ${new Date(todo.createdAt).toLocaleDateString()}`}</Typography>
			</CardContent>
			<CardActions>
				<Checkbox checked={todo.completed} onClick={handleCheckClick}></Checkbox>
			</CardActions>
		</Card>
	)
}

const Todos = () => {
	const [todos, setTodos] = useState<TodoType[]>(mockTodos)
	const setTodo = (todo: TodoType) => {
		const updatedTodos = todos.map((t) => {
			if (t._id === todo._id) {
				return todo
			}
			return t
		})
		setTodos(updatedTodos)
	}

	return (
		<Stack flexWrap={'wrap'} spacing={2} direction={'row'}>
			{todos.map((todo) => {
				return <Todo todo={todo} key={todo._id} setTodo={setTodo} />
			})}
		</Stack>
	)
}

export default Todos
