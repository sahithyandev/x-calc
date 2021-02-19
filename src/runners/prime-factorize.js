import { memoize } from "../utils.js"
import { isPrime } from "./is-prime.js"

const meta = {
	name: "prime-factorize",
	description: "Factorize a number into primes",
	usage: "prime-factorize(~48~)",
}

/**
 * @description Factorizes a number into primes
 *
 * @returns {number[]}
 */
function _primeFactorize(n) {
	// TODO rename this function
	if (n < 2) return

	const { mainValue: isPrimeResult, divider: divider1 } = isPrime(n)

	if (isPrimeResult) return [n]

	const primeFactors = []
	const divider2 = n / divider1

	primeFactors.push(..._primeFactorize(divider1))
	primeFactors.push(..._primeFactorize(divider2))

	return primeFactors
}

/**
 * @param {number[]} numbers
 */
function extractPowers(numbers) {
	const powersObj = {}

	for (let n of numbers) {
		if (n in powersObj) {
			powersObj[n]++
		} else {
			powersObj[n] = 1
		}
	}

	return powersObj
}

/**
 * @typedef PrimeFactorizeOutputObj
 * @property {number[]} mainValue
 * @property {string} formattedValue
 * @property {object} primePowers
 */

export const primeFactorize = memoize(
	/**
	 * @param {number} n
	 *
	 * @returns {PrimeFactorizeOutputObj}
	 */
	(n) => {
		if (n <= 0) return null
		if (n === 1) return { mainValue: [1] }

		const primeFactorization = _primeFactorize(n)

		return {
			mainValue: primeFactorization,
			formattedValue: primeFactorization.join(" x "),
			primePowers: extractPowers(primeFactorization),
		}
	},
)
primeFactorize.meta = meta
