import type { TodoType } from '../model/todoType.ts'
import { memo, type SyntheticEvent, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Card, CardActions, CardContent, Checkbox, TextField, CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DoneIcon from '@mui/icons-material/Done'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useAppDispatch } from '../../../app/store.ts'
import { setTodo } from '../model/store/todosStore.ts'
import { useDeleteTodoQueryMutation, useUpdateTodoQueryMutation } from '../api/todoApi.ts'
import { NavLink } from 'react-router'

type TodoProps = {
	todo: TodoType
}

export const Todo = memo(
	({ todo }: TodoProps) => {
		const [isTitle, setIsTitle] = useState(true)
		const [isDescription, setIsDescription] = useState(true)
		const { enqueueSnackbar } = useSnackbar()

		const [editedTitle, setEditedTitle] = useState(todo.title)
		const [editedDescription, setEditedDescription] = useState(todo.description)

		const dispatch = useAppDispatch()

		const handleTitleChanger = () => {
			setIsTitle(!isTitle)
		}

		const handleDescriptionChanger = () => {
			setIsDescription(!isDescription)
		}

		const handleTitleChangerTextField = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			const newValue = e.currentTarget.value
			setEditedTitle(newValue)
			dispatch(setTodo({ ...todo, title: newValue, updatedAt: Date() }))
		}

		const handleTitleChangerDescriptionTextField = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
			const newValue = e.currentTarget.value
			setEditedDescription(newValue)
			dispatch(setTodo({ ...todo, description: newValue, updatedAt: Date() }))
		}

		const [deleteTodoFromBackend, { isLoading: isDeletingTodo, isError: isErrorDeleteTodo }] =
			useDeleteTodoQueryMutation()

		const [updateTodoToBackend, { isLoading: isUpdatingTodo, isError: isErrorUpdatingTodo }] =
			useUpdateTodoQueryMutation()

		const isLoading = isDeletingTodo || isUpdatingTodo
		const isError = isErrorDeleteTodo || isErrorUpdatingTodo

		const handleRemoveTodo = () => {
			deleteTodoFromBackend(todo._id)
		}

		const handleCheckClick = () => {
			updateTodoToBackend({ _id: todo._id, completed: !todo.completed })
		}

		const DoneEditTitle = () => {
			updateTodoToBackend({ _id: todo._id, title: editedTitle })
			setIsTitle(!isTitle)
			enqueueSnackbar('Заголовок успешно обновлен!', { variant: 'success' })
		}

		const DoneEditDescription = () => {
			updateTodoToBackend({ _id: todo._id, description: editedDescription })
			enqueueSnackbar('Заголовок успешно обновлен!', { variant: 'success' })
			setIsDescription(!isDescription)
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
			<Card variant="outlined" sx={{ maxWidth: 200 }}>
				<CardContent>
					{isTitle ? (
						<>
							<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
								<NavLink to={`/todo/${todo._id}`}>{todo.title}</NavLink>
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
	},
	(prevProps, nextProps) => Object.is(prevProps.todo, nextProps.todo)
)
