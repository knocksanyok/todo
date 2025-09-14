import type { TodoType } from '../model/todoType.ts'
import { type SyntheticEvent, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Card, CardActions, CardContent, Checkbox, TextField } from '@mui/material'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DoneIcon from '@mui/icons-material/Done'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useAppDispatch } from '../../../app/store.ts'
import { setTodo, setTodos } from '../model/store/todosStore.ts'
import { deleteTodo, getTodos, updateTodo } from '../api/todoApi.ts'

type TodoProps = {
	todo: TodoType
}

export const Todo = ({ todo }: TodoProps) => {
	const [isTitle, setIsTitle] = useState(true)
	const [isDescription, setIsDescription] = useState(true)

	const [editedTitle, setEditedTitle] = useState(todo.title)
	const [editedDescription, setEditedDescription] = useState(todo.description)

	const dispatch = useAppDispatch()

	const handleCheckClick = async () => {
		const todoForUpdate = todo._id
		await updateTodo(todoForUpdate, { completed: !todo.completed })
		dispatch(setTodo({ ...todo, completed: !todo.completed }))
	}

	const handleTitleChanger = () => {
		setIsTitle(!isTitle)
	}

	const handleTitleChangerTextField = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setEditedTitle(newValue)
		dispatch(setTodo({ ...todo, title: newValue, updatedAt: Date() }))
	}

	const handleDescriptionChanger = () => {
		setIsDescription(!isDescription)
	}

	const handleTitleChangerDescriptionTextField = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setEditedDescription(newValue)
		dispatch(setTodo({ ...todo, description: newValue, updatedAt: Date() }))
	}

	const DoneEditTitle = async () => {
		const todoForUpdate = todo._id
		await updateTodo(todoForUpdate, { title: todo.title })
		setIsTitle(!isTitle)
		enqueueSnackbar('Заголовок успешно обновлен!', { variant: 'success' })
	}

	const DoneEditDescription = async () => {
		const todoForUpdate = todo._id
		await updateTodo(todoForUpdate, { description: todo.description })
		setIsDescription(!isDescription)
		enqueueSnackbar('Описание успешно обновлено!', { variant: 'success' })
	}

	const handleRemoveTodo = async () => {
		try {
			const todoForDelete = todo._id
			await deleteTodo(todoForDelete)
			getTodos().then((todos) => {
				dispatch(setTodos(todos.data || []))
			})
		} catch (error) {
			enqueueSnackbar('Error deleting todo', { variant: 'error' })
			console.error(error)
		}
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
