import { memoize } from "./../utils"

const meta = {
	name: "is prime?",
	description: "Checks if a number is a prime number",
}

export const isPrime = memoize(
	/**
	 * @param {number} n
	 *
	 * @returns {[boolean|number]}
	 */
	(n) => {
		if (n < 2) return [false, null]

		for (let divisor_i = 2; divisor_i <= n / 2; divisor_i++) {
			if (n % divisor_i === 0) {
				return [false, divisor_i]
			}
		}
		return [true, null]
	},
)
isPrime.meta = meta
