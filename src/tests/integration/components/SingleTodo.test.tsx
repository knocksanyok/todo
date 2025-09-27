import { describe, it } from 'vitest'
import { render } from '@testing-library/react'
import SingleTodo from '../../../entities/Todo/ui/SingleTodo.tsx'
import { Provider } from 'react-redux'
import { store } from '../../../app/store.ts'
import '@testing-library/jest-dom'

describe('SingleTodo', () => {
	it('renders without crashing', () => {
		render(
			<Provider store={store}>
				<SingleTodo />
			</Provider>
		)
	})

	// it('renders without crashing with mocks', async () => {
	// 	// vi.mock('../api/todoApi.ts', () => ({
	// 	// 	useGetTodoByIdQuery: vi.fn(() => ({
	// 	// 		data: {
	// 	// 			_id: '1',
	// 	// 			title: 'Test Todo',
	// 	// 			description: 'Test description',
	// 	// 			completed: false,
	// 	// 			createdAt: new Date().toISOString(),
	// 	// 			updatedAt: new Date().toISOString(),
	// 	// 		},
	// 	// 		isError: false,
	// 	// 	})),
	// 	// }))
	//
	// 	render(
	// 		<Provider store={store}>
	// 			<SingleTodo />
	// 		</Provider>
	// 	)
	// 	await waitFor(() => {
	// 		expect(screen.getByText('Test Todo')).toBeInTheDocument()
	// 	})
	// })
})
