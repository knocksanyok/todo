import type { TodoType } from '../model/todoType.ts'
import { memo, type SyntheticEvent, useEffect, useState } from 'react'
import { useSnackbar } from 'notistack'
import { Card, CardActions, CardContent, Checkbox, TextField, CircularProgress } from '@mui/material'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import DoneIcon from '@mui/icons-material/Done'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { useAppDispatch, useAppSelector } from '../../../app/store.ts'
import { selectFilters, setTodo, setTodos } from '../model/store/todosStore.ts'
import { deleteTodo, getTodos, updateTodo, useDeleteTodoQueryMutation } from '../api/todoApi.ts'
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
		const filters = useAppSelector(selectFilters)

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

		//Новая логика

		const [deleteTodoFromBackend, { isLoading: isDeletingTodo, isError: isErrorDeleteTodo }] =
			useDeleteTodoQueryMutation()

		const isLoading = isDeletingTodo
		const isError = isErrorDeleteTodo

		const handleRemoveTodo = () => {
			deleteTodoFromBackend(todo._id)
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
