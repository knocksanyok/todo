import { type SyntheticEvent, useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { getTodoById, updateTodo } from '../api/todoApi.ts'
import type { TodoType } from '../model/todoType.ts'
import { Card, CardContent, Checkbox, Stack, TextField } from '@mui/material'
import type { To } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { formatDistanceToNow } from 'date-fns'
import ModeEditIcon from '@mui/icons-material/ModeEdit'
import IconButton from '@mui/material/IconButton'
import DoneIcon from '@mui/icons-material/Done'
import { setTodo } from '../model/store/todosStore.ts'
import { useAppDispatch } from '../../../app/store.ts'

const SingleTodo = () => {
	const [todo, setTodoHere] = useState<TodoType>()

	const params = useParams<{ _id: string }>()
	const dispatch = useAppDispatch()

	const [isEdit, setEdit] = useState(true)

	const [editedTitle, setEditedTitle] = useState(todo?.title)
	const [editedDescription, setEditedDescription] = useState(todo?.description)

	useEffect(() => {
		if (!params._id) return

		getTodoById(params._id).then((res) => {
			setTodoHere(res.data)
		})
	}, [params._id])

	if (!todo) return <h1>Loading</h1>

	const handleCheckClick = async () => {
		await updateTodo(todo._id, { completed: !todo.completed })
		setTodoHere({ ...todo, completed: !todo.completed })
		dispatch(setTodo({ ...todo, completed: !todo.completed }))
	}

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

	const handleEditMode = async () => {
		await updateTodo(todo._id, { title: editedTitle, description: editedDescription })
		setEdit(!isEdit)
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
						<Typography>{todo.createdAt}</Typography>
						<Typography>Time for last update:{formatDistanceToNow(todo.updatedAt)}</Typography>
						<Checkbox checked={todo.completed} onClick={handleCheckClick}></Checkbox>
					</CardContent>
				</Card>
			</Stack>
		</div>
	)
}

export default SingleTodo
