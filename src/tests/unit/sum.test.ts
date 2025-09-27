import { expect, test, describe, it } from 'vitest'
import { sum } from '../../shared/util /sum.ts'

test('adds 1 + 2 to equal 3', () => {
	expect(sum(1, 2)).toBe(3)
})

describe('function sum', () => {
	it('of 2 and 3 should be 5', () => {
		expect(sum(1, 4)).toBe(5)
	})
})
