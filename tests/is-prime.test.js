import { isPrime } from "./../src/runners/is-prime"

import { PRIMES } from "./NUMBERS"

describe("Checking for primes", () => {
	PRIMES.forEach((number) => {
		test(`${number}`, () => {
			const { mainValue: result, divider } = isPrime(number)
			expect(result).toBe(true)
			expect(divider).toBe(null)
		})
	})
})

const NON_PRIME_NUMBERS = [
	-2,
	-10,
	-5,
	-4,
	-200,
	-7,
	-1,
	0,
	1,
	4,
	6,
	8,
	9,
	10,
	12,
	14,
	15,
	16,
	18,
	20,
]

describe("Checking for non-primes", () => {
	NON_PRIME_NUMBERS.forEach((number) => {
		test(`${number}`, () => {
			const { mainValue: result } = isPrime(number)
			expect(result).toBe(false)
		})
	})
})
