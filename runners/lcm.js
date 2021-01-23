import { Runner } from "./../models/index.js"
import { gcd } from "./gcd.js"

const meta = {
	name: "LCM",
	long_name: "Least Common Multiple",
	description: "",
}

/**
 * @param {number[]} numbers
 */
export const lcm = new Runner((...numbers) => {
	if (numbers.length === 1) throw new Error("lcm: expects atleast 2 numbers")

	if (numbers.length > 2) {
		const [a, b, ...rest] = numbers
		return lcm(lcm(a, b).value, ...rest)
	}

	if (numbers.length === 2) {
		const [a, b] = numbers

		if (numbers.includes(1))
			return {
				value: a == 1 ? b : a,
			}

		return {
			value: (a * b) / gcd(a, b).value,
		}
	}
}, meta)

console.log(lcm(20, 30))
console.log(lcm(20, 100))
console.log(lcm(2, 3, 4, 5, 6))
