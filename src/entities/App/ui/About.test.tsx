import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import About from './About.tsx'
import { describe, test, afterEach, expect } from 'vitest'

describe('About component', () => {
	afterEach(cleanup)

	test('renders correctly', () => {
		const rendered = render(<About />)
		expect(rendered.baseElement).toMatchSnapshot()
		screen.debug()
		const heading = screen.getByTestId('version-container')
		expect(heading).toBeDefined()
	})
	test('increment counter', () => {
		render(<About />)
		const count = screen.getByTestId('counter')
		const countContent = count.textContent
		expect(countContent).toBe('0')
		expect(countContent).not.toBeNull()

		const button = screen.getByTestId('increment-button')
		fireEvent.click(button)

		const newCount = screen.getByTestId('counter')
		const newCountContent = newCount.textContent
		expect(newCountContent).toBe('1')
		expect(newCountContent).not.toBeNull()
		expect(newCountContent).not.toBe(countContent)
	})
})
