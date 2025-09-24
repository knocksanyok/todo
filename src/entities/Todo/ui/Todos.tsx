import { CircularProgress, Container, Stack } from '@mui/material'
import { Todo } from './Todo.tsx'
import { useEffect, useState } from 'react'

import { useGetTodosQuery, useUpdateTodoQueryMutation } from '../api/todoApi.ts'
import { useSnackbar } from 'notistack'
import { useAppSelector } from '../../../app/store.ts'
import { selectFilters } from '../model/store/todosStore.ts'
import { selectUser } from '../../User/model/store/userStore.ts'
import {
	closestCenter,
	DndContext,
	type DragEndEvent,
	PointerSensor,
	TouchSensor,
	useSensor,
	useSensors,
} from '@dnd-kit/core'
import type { TodoType } from '../model/todoType.ts'
import { arrayMove, rectSwappingStrategy, SortableContext } from '@dnd-kit/sortable'
import TodosAddButtons from './TodosAddButtons.tsx'

const Todos = () => {
	const { enqueueSnackbar } = useSnackbar()
	const filters = useAppSelector(selectFilters)
	const user = useAppSelector(selectUser)

	const [todos, setTodos] = useState<TodoType[]>([])
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 10 } }),
		useSensor(TouchSensor)
	)

	const handleDragEnd = (e: DragEndEvent) => {
		const { active, over } = e
		if (active.id !== over?.id) {
			const oldIndex = todos.findIndex((t) => t._id === active.id)
			const newIndex = todos.findIndex((t) => t._id === over?.id)
			const newTodos = arrayMove(todos, oldIndex, newIndex).map((t, i) => ({ ...t, order: i }))
			setTodos(newTodos)
			updateTodoToBackend({ _id: String(active.id), order: newIndex })
			updateTodoToBackend({ _id: String(over?.id), order: oldIndex })
		}
	}

	const [updateTodoToBackend] = useUpdateTodoQueryMutation()

	const { data, isLoading, isError } = useGetTodosQuery(filters, {
		skip: !user?.access_token,
		// pollingInterval: 5000,
	})

	useEffect(() => {
		if (data) {
			setTodos([...data].sort((a, b) => a.order - b.order))
		}
	}, [data])

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('Error fetching todos', { variant: 'error' })
		}
	}, [isError, enqueueSnackbar])

	if (isLoading) {
		return <CircularProgress />
	}

	return (
		<Container style={{ touchAction: 'none' }}>
			<TodosAddButtons></TodosAddButtons>
			<DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
				<SortableContext items={todos.map((todo) => todo._id)} strategy={rectSwappingStrategy}>
					<Stack flexWrap={'wrap'} spacing={2} direction={'row'}>
						{todos.map((todo) => {
							return <Todo todo={todo} key={todo._id} />
						})}
					</Stack>
				</SortableContext>
			</DndContext>
		</Container>
	)
}

export default Todos
