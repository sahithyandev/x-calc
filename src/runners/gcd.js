import { multiply, memoize } from "../utils.js"
import { factorize } from "./factorize.js"
import { iSet } from "./../models/iSet.js"

const meta = {
	name: "gcd",
	longName: "Greatest Common Divisor",
	description: "",
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
				return {
					mainValue: a,
					valueAsPrimeFactors: factorize(a).mainValue,
				}
			}
			if (a == 0 || b == 0) {
				return {
					mainValue: a || b,
					valueAsPrimeFactors: factorize(a || b).mainValue,
				} // return which is not zero
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
				new iSet(primeFactors[0]).intersectionWith(new iSet(primeFactors[1])),
			)
				.map(removeFactorName)
				.map((v) => parseInt(v))
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

// console.log(gcd(10, 40), 10)
// console.log(gcd(100, 40), 20)
// console.log(gcd(100, 40, 15), 5)
// console.log(gcd(100, 40, 32), 4)
// console.log(gcd(100, 40, 140, 25), 5)
