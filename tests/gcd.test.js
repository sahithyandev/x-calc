import { gcd } from "../src/runners/index"

import { PRIMES } from "./NUMBERS"

describe("gcd: primes", () => {
	for (let i = 0; i < PRIMES.length - 1; i++) {
		const [primeNum1, primeNum2] = [PRIMES[i], PRIMES[i + 1]]
		test(`(${primeNum1}, ${primeNum2})`, () => {
			const { mainValue } = gcd(primeNum1, primeNum2)

			expect(mainValue).toBe(1)
		})
	}
})

describe("gcd: normal-tests", () => {
	const CASES = [
		{
			input: [1, 2],
			output: 1,
		},
		{ input: [3, 4], output: 1 },
		{ input: [4, 10], output: 2 },
		{ input: [20, 100], output: 20 },
		{ input: [20, 20], output: 20 },
		{ input: [2, 6, 4], output: 1 },
		{ input: [4, 12, 60, 20], output: 4 },
		{ input: [1, 2, 3, 4, 5], output: 1 },
	]

	CASES.map((_) => {
		// TODO find a suitable name
		test(`gcd: ${_.input}`, () => {
			expect(gcd(..._.input).mainValue).toBe(_.output)
		})
	})
})

// TODO add error cases
