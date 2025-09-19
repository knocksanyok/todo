export function sum(a: number | string, b: number) {
	//@ts-expect-error
	return a + b
}
