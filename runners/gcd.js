import { multiply, memoize } from "../utils.js"
import { factorize } from "./factorize.js"

const meta = {
	name: "GCD",
	long_name: "Greatest Common Divisor",
	description: "",
}

/**
 * @param {Set<number>} A
 * @param {Set<number>} B
 *
 * @returns {Set<number>}
 */
function setIntersection(A, B) {
	let _intersection = new Set()
	for (let elem of B) {
		if (A.has(elem)) {
			_intersection.add(elem)
		}
	}
	return _intersection
}

/**
 * @typedef GCDOutputObj
 *
 * @property {number} value
 * @property {number[]}	valueAsPrimeFactors
 */

export const gcd = memoize(
	/**
	 * @param {number[]} numbers
	 * @returns {GCDOutputObj}
	 */
	(...numbers) => {
		if (numbers.length < 1) {
			throw new Error("gcd: requires atleast two numbers")
		}
		if (numbers.length > 2) {
			// calculate gcd of the first two numbers
			let f2 = gcd(numbers[0], numbers[1]).value

			return gcd(f2, ...numbers.slice(2))
		}

		if (numbers.length === 2) {
			const [a, b] = numbers
			if (a == b) {
				return 0
			}
			if (a == 0 || b == 0) {
				return a || b // return which is not zero
			}

			// get primeFactors of the numbers
			// then name every factor to do the set intersection
			const primeFactors = numbers.map((v) => {
				const primePowers = factorize(v).primePowers

				const entries = Object.keys(primePowers).map((key) => [
					key,
					primePowers[key],
				])

				const namedFactors = []
				entries.forEach(([powerBase, powerValue]) => {
					for (let power_i = 0; power_i < powerValue; power_i++) {
						namedFactors.push(`${powerBase}<${power_i}>`)
					}
				})

				return new Set(namedFactors)
			})

			/**
			 * @param {string} factorName
			 * @exports string
			 */
			const removeFactorName = (factorName) => factorName.replace(/<\d+>/, "")

			const intersectionArray = Array.from(
				setIntersection(primeFactors[0], primeFactors[1]),
			)
				.map(removeFactorName)
				.map((v) => parseInt(v))
			if (intersectionArray.length === 0) intersectionArray.push(1)

			return {
				value: multiply(...intersectionArray),
				valueAsPrimeFactors: intersectionArray,
			}
		}
	},
	(...numbers) => {
		return numbers.sort((a, b) => a - b).join(",")
	},
)
gcd.meta = meta

// console.log(gcd(10, 40), 10)
// console.log(gcd(100, 40), 20)
// console.log(gcd(100, 40, 15), 5)
// console.log(gcd(100, 40, 32), 4)
// console.log(gcd(100, 40, 140, 25), 5)
