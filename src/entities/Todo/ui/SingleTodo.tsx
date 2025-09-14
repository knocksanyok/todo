import { useEffect, useState } from 'react'
import { NavLink, useParams } from 'react-router'
import { getTodoById } from '../api/todoApi.ts'
import type { TodoType } from '../model/todoType.ts'
import { Stack } from '@mui/material'
import type { To } from 'react-router-dom'
import Typography from '@mui/material/Typography'
import { formatDistanceToNow } from 'date-fns'

const SingleTodo = () => {
	const [todo, setTodo] = useState<TodoType>()
	const params = useParams<{ _id: string }>()

	useEffect(() => {
		if (!params._id) return

		getTodoById(params._id).then((res) => {
			setTodo(res.data)
		})
	}, [params._id])

	if (!todo) return <h1>Loading</h1>

	return (
		<div>
			<Stack p={3}>
				<NavLink to={-1 as To}>Back</NavLink>
				<Typography variant={'h4'}>{todo.title}</Typography>
				<Typography>{todo.description}</Typography>
				<Typography>{todo.createdAt}</Typography>
				<Typography>Time for last update:{formatDistanceToNow(todo.updatedAt)}</Typography>
				<Typography>{todo.completed ? 'Completed' : 'Not completed'}</Typography>
			</Stack>
		</div>
	)
}

export default SingleTodo
