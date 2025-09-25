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
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import useEditMode from '../../../shared/hooks/useEditMode.ts'

type TodoProps = {
	todo: TodoType
}

export const Todo = memo(
	({ todo }: TodoProps) => {
		const { enqueueSnackbar } = useSnackbar()

		const [editedTitle, setEditedTitle] = useState(todo.title)
		const [editedDescription, setEditedDescription] = useState(todo.description)

		const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: todo._id })
		const style = { transition, transform: CSS.Translate.toString(transform) }

		const dispatch = useAppDispatch()

		const { handleTitleChange, handleDescriptionChange, isEditTitle, isEditDescription } = useEditMode({
			initialTitleState: true,
			initialDescriptionState: true,
		})

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
			handleTitleChange()
			enqueueSnackbar('Заголовок успешно обновлен!', { variant: 'success' })
		}

		const DoneEditDescription = () => {
			updateTodoToBackend({ _id: todo._id, description: editedDescription })
			enqueueSnackbar('Заголовок успешно обновлен!', { variant: 'success' })
			handleDescriptionChange()
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
			<Card variant="outlined" sx={{ maxWidth: 200 }} ref={setNodeRef} style={style} {...attributes} {...listeners}>
				<CardContent>
					{isEditTitle ? (
						<>
							<Typography gutterBottom sx={{ color: 'text.secondary', fontSize: 14 }}>
								<NavLink to={`/todo/${todo._id}`}>{todo.title}</NavLink>
							</Typography>
							<IconButton size="small" onClick={handleTitleChange}>
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
					{isEditDescription ? (
						<>
							<Typography variant="body2">{todo.description}</Typography>
							<IconButton size="small" onClick={handleDescriptionChange}>
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
