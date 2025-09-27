import { expect, describe, it } from 'vitest'
import { useDimensions } from '../../shared/hooks/useDemensions.ts'
import { renderHook } from '@testing-library/react'

describe('useDimensions', () => {
	it('should measure element with width size 399, isMobile true', () => {
		const div = document.createElement('div')
		Object.defineProperty(div, 'offsetWidth', { configurable: true, value: 399 })
		Object.defineProperty(div, 'offsetHeight', { configurable: true, value: 100 })
		const { result } = renderHook(() => useDimensions(div))

		expect(result.current).toEqual({ width: 399, height: 100, isMobile: true })
	})

	it('should measure element with width size 400, is Mobile false', () => {
		const div = document.createElement('div')
		Object.defineProperty(div, 'offsetWidth', { configurable: true, value: 400 })
		Object.defineProperty(div, 'offsetHeight', { configurable: true, value: 100 })
		const { result } = renderHook(() => useDimensions(div))

		expect(result.current).toEqual({ width: 400, height: 100, isMobile: false })
	})

	it('should measure window with width size 399, is Mobile true', () => {
		Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 399 })
		Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1000 })

		const { result } = renderHook(() => useDimensions())

		expect(result.current).toEqual({ width: 399, height: 1000, isMobile: true })
	})

	it('should measure window with width size 400, is Mobile false', () => {
		Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 400 })
		Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 1000 })

		const { result } = renderHook(() => useDimensions())

		expect(result.current).toEqual({ width: 400, height: 1000, isMobile: false })
	})
})
