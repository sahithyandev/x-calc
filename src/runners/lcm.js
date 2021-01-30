import { memoize } from "../utils.js"
import { gcd } from "./gcd.js"

const meta = {
	name: "lcm",
	longName: "Least Common Multiple",
	description: "",
	usage: "lcm(~4,6~)",
}

/**
 * @typedef LCMResultObj
 *
 * @property {number} mainValue
 */

export const lcm = memoize(
	/**
	 * @param {number[]} numbers
	 * @returns {LCMResultObj}
	 */
	(...numbers) => {
		if (numbers.length < 2) throw new Error("lcm: expects atleast 2 numbers")

		if (numbers.length > 2) {
			const [a, b, ...rest] = numbers
			return lcm(lcm(a, b).mainValue, ...rest)
		}

		if (numbers.length === 2) {
			const [a, b] = numbers

			if (numbers.includes(1))
				return {
					mainValue: a == 1 ? b : a,
				}

			return {
				mainValue: (a * b) / gcd(a, b).mainValue,
			}
		}
	},
	(...numbers) => numbers.sort((a, b) => a - b).join(","),
)
lcm.meta = meta

// console.log(lcm(20, 30))
// console.log(lcm(20, 100))
// console.log(lcm(2, 3, 4, 5, 6))
