import { memoize } from "../utils.js"

const meta = {
	name: "is-prime",
	description: "Checks if a number is a prime number",
	usage: "is-prime(~10~)",
}

export const isPrime = memoize(
	/**
	 * @param {number} n
	 *
	 * @returns {[boolean|number]}
	 */
	(n) => {
		if (n < 2) return { value: false, divider: null }

		for (let divisor_i = 2; divisor_i <= n / 2; divisor_i++) {
			if (n % divisor_i === 0) {
				return { value: false, divider: divisor_i }
			}
		}
		return { value: true, divider: null }
	},
)
isPrime.meta = meta
