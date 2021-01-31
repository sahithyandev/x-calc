import { memoize } from "./../utils.js"
import { gcd } from "./gcd.js"

const meta = {
	name: "calculate-ratio",
	description: "Calculates ratio of two or more numbers",
	usage: "calculate-ratio(~15,5~)",
}

export const calculateRatio = memoize(
	/**
	 * @param {number[]} numbers
	 */
	(...numbers) => {
		//
		const reducer = gcd(...numbers).mainValue
		const reducedNumbers = numbers.map((number) => number / reducer)

		return {
			mainValue: reducedNumbers,
			formattedValue: reducedNumbers.join(" : "),
			reducer,
		}
	},
	(...items) => {
		return items.join(", ")
	},
)

calculateRatio.meta = meta
