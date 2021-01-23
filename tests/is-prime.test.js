import { isPrime } from "./../runners/is-prime.mjs"

const PRIME_NUMBERS = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47]

describe("Checking for primes", () => {
	PRIME_NUMBERS.forEach((number) => {
		test(`${number}`, () => {
			const [result, divider] = isPrime(number)
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
			const [result] = isPrime(number)
			expect(result).toBe(false)
		})
	})
})
