import { Runner } from "./../models/index.js"

const meta = {
	name: "is prime?",
	description: "Checks if a number is a prime number",
}

export const isPrime = new Runner(
	/**
	 * @param {number} n
	 *
	 * @exports [boolean|number]
	 */
	(n) => {
		if (n === 1) return [false, null]
		for (let divisor_i = 2; divisor_i <= n / 2; divisor_i++) {
			if (n % divisor_i === 0) return [false, divisor_i]
		}
		return [true, null]
	},
	meta,
)
