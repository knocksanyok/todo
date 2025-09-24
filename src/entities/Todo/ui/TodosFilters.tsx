import { useAppDispatch, useAppSelector } from '../../../app/store.js'
import { selectFilters, setCompletedFilter, setLimit, setPage, setSearch } from '../model/store/todosStore.js'
import {
	Accordion,
	AccordionDetails,
	AccordionSummary,
	ButtonGroup,
	Input,
	MenuItem,
	Select,
	type SelectChangeEvent,
} from '@mui/material'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useThrottledCallback } from 'use-debounce'
import { useEffect, useState } from 'react'
import { useGetAllTodosQuery } from '../api/todoApi.ts'
import { selectUser } from '../../User/model/store/userStore.ts'

const TodosFilters = () => {
	const filters = useAppSelector(selectFilters)
	const dispatch = useAppDispatch()
	const user = useAppSelector(selectUser)

	const { data } = useGetAllTodosQuery(undefined, { skip: !user?.access_token })

	const todosLength = data?.length
	const shownTodos = filters.page * filters.limit

	const [query, setQuery] = useState('')

	const handleSearchDispatch = () => {
		dispatch(setSearch(query))
	}

	const throttledSearch = useThrottledCallback(handleSearchDispatch, 300)

	const handleChangeSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
		const inputValue = e.target.value
		setQuery(inputValue)
		throttledSearch()
	}

	const handleFilterChange = (filter: 'true' | 'false' | 'all') => {
		dispatch(setCompletedFilter(filter))
	}

	const handleChangeLimit = (e: SelectChangeEvent<number>) => {
		dispatch(setLimit(e.target.value))
	}

	const handlePreviousClick = () => {
		if (filters.page === 1) return
		dispatch(setPage(filters.page - 1))
	}

	const handleNextClick = () => {
		if (todosLength! < filters.limit) return
		dispatch(setPage(filters.page + 1))
	}

	useEffect(() => {
		dispatch(setSearch(query))
	}, [dispatch, query])

	return (
		<>
			<Accordion>
				<AccordionSummary>Filters</AccordionSummary>
				<AccordionDetails>
					<Input onChange={handleChangeSearch} value={query} />
					<ButtonGroup>
						<Button
							variant={filters.completed === 'true' ? 'contained' : 'outlined'}
							onClick={() => handleFilterChange('true')}
						>
							Completed
						</Button>
						<Button
							variant={filters.completed === 'false' ? 'contained' : 'outlined'}
							onClick={() => handleFilterChange('false')}
						>
							In Progress
						</Button>
						<Button
							variant={filters.completed === 'all' ? 'contained' : 'outlined'}
							onClick={() => handleFilterChange('all')}
						>
							Show All
						</Button>
					</ButtonGroup>
					<Typography>Show by:</Typography>
					<Select value={filters.limit} variant={'filled'} onChange={handleChangeLimit}>
						<MenuItem value={5}>5</MenuItem>
						<MenuItem value={10}>10</MenuItem>
						<MenuItem value={20}>20</MenuItem>
					</Select>
				</AccordionDetails>
			</Accordion>
			<ButtonGroup>
				<Button onClick={handlePreviousClick} disabled={filters.page === 1}>
					Previous
				</Button>
				<Button onClick={handleNextClick} disabled={shownTodos >= todosLength!}>
					Next
				</Button>
			</ButtonGroup>
		</>
	)
}

export default TodosFilters
