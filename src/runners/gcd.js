import { multiply, memoize } from "../utils.js"
import { factorize } from "./factorize.js"
import { NumberedSet } from "./../models/NumberedSet.js"

const meta = {
	name: "gcd",
	longName: "Greatest Common Divisor",
	description: "Calculates greatest common divisor of two or more integers",
	usage: "gcd(~100,40~)",
}

/**
 * @typedef GCDOutputObj
 *
 * @property {number} mainValue
 * @property {number[]}	valueAsPrimeFactors
 */

export const gcd = memoize(
	/**
	 * @param {number[]} numbers
	 * @returns {GCDOutputObj}
	 */
	(...numbers) => {
		if (numbers.length < 2) {
			throw new Error("gcd: requires atleast two numbers")
		}
		if (numbers.length > 2) {
			// calculate gcd of the first two numbers
			let f2 = gcd(numbers[0], numbers[1]).mainValue

			return gcd(f2, ...numbers.slice(2))
		}

		if (numbers.length === 2) {
			const [a, b] = numbers
			if (a == b) {
				return {
					mainValue: a,
					valueAsPrimeFactors: factorize(a).mainValue,
				}
			}
			if (a == 0 || b == 0) {
				// return which is not zero
				return {
					mainValue: a || b,
					valueAsPrimeFactors: factorize(a || b).mainValue,
				}
			}

			if (a === 1 || b === 1) {
				return {
					mainValue: 1,
					valueAsPrimeFactors: null,
				}
			}

			const primeFactorsSet = numbers.map((number) => {
				const x = factorize(number).inPrimes
				return new NumberedSet(x)
			})

			const intersectionArray = primeFactorsSet[0].intersectionWith(
				primeFactorsSet[1],
			)
			if (intersectionArray.length === 0) intersectionArray.push(1)

			return {
				mainValue: multiply(intersectionArray),
				valueAsPrimeFactors: intersectionArray,
			}
		}
	},
	(...numbers) => {
		return numbers.sort((a, b) => a - b).join(",")
	},
)
gcd.meta = meta

// console.log(gcd(5, 10), 5)
// console.log(gcd(5, 10), 10)
// console.log(gcd(100, 40), 20)
// console.log(gcd(100, 40, 15), 5)
// console.log(gcd(100, 40, 32), 4)
// console.log(gcd(100, 40, 140, 25), 5)
