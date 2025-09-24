import { type SyntheticEvent, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { useGetTodoByIdQuery, useUpdateTodoQueryMutation } from '../api/todoApi.ts'
import type { TodoType } from '../model/todoType.ts'
import { Card, CardContent, Checkbox, Stack, TextField, CircularProgress, Button } from '@mui/material'
import type { To } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { formatDistanceToNow } from 'date-fns'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import IconButton from '@mui/material/IconButton'
import DoneIcon from '@mui/icons-material/Done'
import { setTodo } from '../model/store/todosStore.ts'
import { useAppDispatch } from '../../../app/store.ts'
import { enqueueSnackbar } from 'notistack'

const SingleTodo = () => {
	const [todo, setTodoHere] = useState<TodoType>()

	const params = useParams<{ _id: string }>()
	const dispatch = useAppDispatch()

	const [isEdit, setEdit] = useState(true)

	const [editedTitle, setEditedTitle] = useState(todo?.title)
	const [editedDescription, setEditedDescription] = useState(todo?.description)

	const { data, isError: isErrorGettingTodo, refetch } = useGetTodoByIdQuery(params._id!, { skip: !params._id })

	const [updateTodoToBackend, { isError: isErrorUpdatingTodo }] = useUpdateTodoQueryMutation()

	const isError = isErrorGettingTodo || isErrorUpdatingTodo

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Error fetching todo', { variant: 'error' })
		}
		setTodoHere(data)
	}, [data, isError])

	if (!todo) return <CircularProgress />

	const handleTitleChangerTextField = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setEditedTitle(newValue)
		setTodoHere({ ...todo, title: newValue })
		dispatch(setTodo({ ...todo, title: newValue }))
	}

	const handleTitleChangerDescriptionTextField = (e: SyntheticEvent<HTMLTextAreaElement | HTMLInputElement>) => {
		const newValue = e.currentTarget.value
		setEditedDescription(newValue)
		setTodoHere({ ...todo, description: newValue })
		dispatch(setTodo({ ...todo, description: newValue }))
	}

	const handleEditMode = () => {
		updateTodoToBackend({ _id: todo._id, title: editedTitle, description: editedDescription })
		setEdit(!isEdit)
	}

	const handleCheckClick = async () => {
		updateTodoToBackend({ _id: todo._id, completed: !todo.completed })
	}

	const handleRefresh = () => {
		refetch()
	}

	return (
		<div>
			<Stack p={3}>
				<NavLink to={-1 as To} style={{ marginBottom: '3rem' }}>
					Back
				</NavLink>
				<Card variant="outlined" sx={{ maxWidth: 500 }}>
					<CardContent sx={{ display: 'flex', flexDirection: 'column', gap: '3rem', alignItems: 'start' }}>
						{isEdit ? (
							<>
								<Typography variant={'h4'}>{todo.title}</Typography>
								<Typography>{todo.description}</Typography>
								<IconButton size="small" onClick={handleEditMode}>
									<ModeEditIcon fontSize="small" />
								</IconButton>
							</>
						) : (
							<>
								<TextField value={todo.title} label={todo.title} onChange={handleTitleChangerTextField}></TextField>
								<TextField
									value={todo.description}
									label={todo.description}
									onChange={handleTitleChangerDescriptionTextField}
								></TextField>
								<IconButton size="small" onClick={handleEditMode}>
									<DoneIcon fontSize="small" />
								</IconButton>
							</>
						)}
						<Typography>{new Date(todo.createdAt).toLocaleString()}</Typography>
						<Typography>Time for last update:{formatDistanceToNow(todo.updatedAt)}</Typography>
						<Checkbox checked={todo.completed} onClick={handleCheckClick}></Checkbox>
					</CardContent>
				</Card>
			</Stack>
			<Button color="inherit" variant="outlined" onClick={handleRefresh}>
				Refresh
			</Button>
		</div>
	)
}

export default SingleTodo
