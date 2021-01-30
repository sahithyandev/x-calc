import { lcm } from "./../src/runners/lcm"

import { PRIMES } from "./NUMBERS"

describe("lcm: primes", () => {
	for (let i = 0; i < PRIMES.length - 1; i++) {
		const [primeNum1, primeNum2] = [PRIMES[i], PRIMES[i + 1]]

		test(`${primeNum1}, ${primeNum2}`, () => {
			const { mainValue } = lcm(primeNum1, primeNum2)
			expect(mainValue).toBe(primeNum1 * primeNum2)
		})
	}
})

describe("lcm: normal-tests", () => {
	const CASES = [
		{
			input: [1, 2],
			output: 2,
		},
		{ input: [3, 4], output: 12 },
		{ input: [4, 5], output: 20 },
		{ input: [2, 5, 6], output: 30 },
	]

	CASES.map((_) => {
		// TODO find a suitable name
		expect(lcm(..._.input).mainValue).toBe(_.output)
	})
})

describe("lcm: errors", () => {
	const ATLEAST_TWO_NUMBER_ERROR_MESSAGE = "lcm: expects atleast 2 numbers"
	const ERROR_CASES = [
		{
			input: [],
			error: ATLEAST_TWO_NUMBER_ERROR_MESSAGE,
		},
		{
			input: [2],
			output: ATLEAST_TWO_NUMBER_ERROR_MESSAGE,
		},
	]

	ERROR_CASES.forEach((errorCase) => {
		test(`lcm: [${errorCase.input.join(", ")}]`, () => {
			expect(lcm(...errorCase.input)).toThrow(errorCase.output)
		})
	})
})
