import { expect, describe, it } from 'vitest'
import { sum } from './sum.js'

describe('function sum', () => {
	it('of 2 and 3 should be 5', () => {
		expect(sum(2, 3)).toBe(5)
	})
	it('of 0 and 0 should be 5', () => {
		expect(sum(0, 0)).toBe(0)
		expect(sum('a', 3)).toBe('a3')
		expect(sum(1, 1)).toBe(2)
	})
})
