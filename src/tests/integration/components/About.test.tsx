import About from '../../../entities/App/ui/About.tsx'
import { render } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { describe, it } from 'vitest'

describe('About', () => {
	it('renders without crashing', () => {
		render(
			<MemoryRouter initialEntries={['/about']}>
				<Routes>
					<Route path="/about" element={<About />} />
				</Routes>
			</MemoryRouter>
		)
	})
})
