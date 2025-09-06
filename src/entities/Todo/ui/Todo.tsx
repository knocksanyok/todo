import type { TodoType } from '../model/todoType.ts'
import { type SyntheticEvent, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Card, CardActions, CardContent, Checkbox, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DoneIcon from '@mui/icons-material/Done'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useTodosStore } from '../model/store/use TodosStore.ts'

type TodoProps = {
	todo: TodoType
	setTodo: (todo: TodoType) => void
}

export const Todo = ({ todo, setTodo }: TodoProps) => {
	const [isTitle, setIsTitle] = useState(true)
	const [isDescription, setIsDescription] = useState(true)

	const [editedTitle, setEditedTitle] = useState(todo.title)
	const [editedDescription, setEditedDescription] = useState(todo.description)

	const removeTodo = useTodosStore((state) => state.removeTodo)

	const handleCheckClick = () => {
		setTodo({ ...todo, completed: !todo.completed })
	}

	const handleTitleChanger = () => {
		setIsTitle(!isTitle)
	}

	const handleTitleChangerTextField = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setEditedTitle(newValue)
		setTodo({ ...todo, title: newValue, updatedAt: Date() })
	}

	const handleDescriptionChanger = () => {
		setIsDescription(!isDescription)
	}

	const handleTitleChangerDescriptionTextField = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setEditedDescription(newValue)
		setTodo({ ...todo, description: newValue, updatedAt: Date() })
	}

	const DoneEditTitle = () => {
		setIsTitle(!isTitle)
		enqueueSnackbar('Заголовок успешно обновлен!', { variant: 'success' })
	}

	const DoneEditDescription = () => {
		setIsDescription(!isDescription)
		enqueueSnackbar('Описание успешно обновлено!', { variant: 'success' })
	}

	const handleRemoveTodo = () => {
		const todoForDelete = todo._id
		removeTodo(todoForDelete)
		console.log(todoForDelete)

		// const updatedTodos = todos.filter((t) => t._id === todo._id)
		// const todoForDelete = updatedTodos[0]._id
		// removeTodo(updatedTodos)
	}

	const { enqueueSnackbar } = useSnackbar()

	return (
		<Card variant="outlined" sx={{ maxWidth: 200 }}>
			<CardContent>
				{isTitle ? (
					<>
						<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
							{todo.title}
						</Typography>
						<IconButton size="small" onClick={handleTitleChanger}>
							<ModeEditIcon fontSize="small" />
						</IconButton>
					</>
				) : (
					<>
						<TextField label={editedTitle} onChange={handleTitleChangerTextField}></TextField>
						<IconButton size="small" onClick={DoneEditTitle}>
							<DoneIcon fontSize="small" />
						</IconButton>
					</>
				)}
				{isDescription ? (
					<>
						<Typography variant="body2">{todo.description}</Typography>
						<IconButton size="small" onClick={handleDescriptionChanger}>
							<ModeEditIcon fontSize="small" />
						</IconButton>
					</>
				) : (
					<>
						<TextField label={editedDescription} onChange={handleTitleChangerDescriptionTextField}></TextField>
						<IconButton size="small" onClick={DoneEditDescription}>
							<DoneIcon fontSize="small" />
						</IconButton>
					</>
				)}
				<Typography>{`Дата создания: ${new Date(todo.createdAt).toLocaleDateString()}`}</Typography>
				<Typography>{`Дата обновления: ${new Date(todo.updatedAt).toLocaleDateString()}`}</Typography>
			</CardContent>
			<CardActions>
				<Checkbox checked={todo.completed} onClick={handleCheckClick}></Checkbox>
			</CardActions>
			<IconButton size="small" onClick={handleRemoveTodo}>
				<DeleteOutlineIcon fontSize="small" />
			</IconButton>
		</Card>
	)
}
