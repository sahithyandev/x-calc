/**
 * @param {number[]} numbers
 *
 * @exports number
 */
export const multiply = (...numbers) => {
	return numbers.reduce((prev, current) => prev * current)
}
