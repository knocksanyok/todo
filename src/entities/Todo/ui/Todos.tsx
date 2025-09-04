import { Card, CardActions, CardContent, Checkbox, Stack, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import type { TodoType } from '../model/todoType.ts'
import { mockTodos } from '../model/mockTodos.ts'
import { type SyntheticEvent, useState } from 'react'
import IconButton from '@mui/material/IconButton'
import ModeEditIcon from '@mui/icons-material/ModeEdit'

type TodoProps = {
	todo: TodoType
	setTodo: (todo: TodoType) => void
}

const Todo = ({ todo, setTodo }: TodoProps) => {
	const [isTitle, setIsTitle] = useState(true)
	const [isDescription, setIsDescription] = useState(true)
	const [value, setValue] = useState('')

	const handleCheckClick = () => {
		setTodo({ ...todo, completed: !todo.completed })
	}

	const handleTitleChanger = () => {
		setIsTitle(!isTitle)
	}

	const handleTitleChangerTextField = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValue(e.currentTarget.value)
		setTodo({ ...todo, title: value, updatedAt: Date() })
	}

	const handleDescriptionChanger = () => {
		setIsDescription(!isDescription)
	}

	const handleTitleChangerDescription = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		setValue(e.currentTarget.value)
		setTodo({ ...todo, description: value, updatedAt: Date() })
	}

	return (
		<Card variant="outlined" sx={{ maxWidth: 200 }}>
			<CardContent>
				{isTitle ? (
					<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
						{todo.title}
					</Typography>
				) : (
					<TextField label={todo.title} onChange={handleTitleChangerTextField}></TextField>
				)}
				<IconButton size="small" onClick={handleTitleChanger}>
					<ModeEditIcon fontSize="small" />
				</IconButton>
				{isDescription ? (
					<Typography variant="body2">{todo.description}</Typography>
				) : (
					<TextField label={todo.description} onChange={handleTitleChangerDescription}></TextField>
				)}
				<IconButton size="small" onClick={handleDescriptionChanger}>
					<ModeEditIcon fontSize="small" />
				</IconButton>
				<Typography>{`Дата создания: ${new Date(todo.createdAt).toLocaleDateString()}`}</Typography>
				<Typography>{`Дата обновления: ${new Date(todo.updatedAt).toLocaleDateString()}`}</Typography>
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
