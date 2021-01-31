import { memoize } from "../utils.js"
import { gcd } from "./gcd.js"

const meta = {
	name: "ratio",
	description: "Calculates ratio of two or more numbers",
	usage: "ratio(~15,5~)",
}

export const ratio = memoize(
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

ratio.meta = meta
