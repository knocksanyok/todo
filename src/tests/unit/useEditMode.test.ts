import { expect, describe, it } from 'vitest'
import { act, renderHook } from '@testing-library/react'
import { useEditMode } from '../../shared/hooks/useEditMode.ts'

describe('useEditMode', () => {
	it('return opposite HandleTitleChanger', () => {
		const { result } = renderHook(() => useEditMode({ initialTitleState: true, initialDescriptionState: true }))
		expect(result.current.isEditTitle).toBe(true)

		act(() => {
			result.current.handleTitleChange()
		})

		expect(result.current.isEditTitle).toBe(false)
	})
})
