import { isPrime } from "./../src/runners/is-prime"

import { PRIMES, NON_PRIME_NUMBERS, isPositive, isNegative } from "./NUMBERS"

describe("is-prime: primes", () => {
	PRIMES.forEach((number) => {
		test(`${number}`, () => {
			const { mainValue: result, divider } = isPrime(number)
			expect(result).toBe(true)
			expect(divider).toBe(null)
		})
	})
})

describe("is-prime: positive non-primes", () => {
	NON_PRIME_NUMBERS.filter(isPositive).forEach((number) => {
		test(`${number}`, () => {
			const { mainValue: result, divider } = isPrime(number)
			expect(result).toBe(false)
			expect(divider).not.toBe(null)
		})
	})
})

describe("is-prime: numbers less than 2", () => {
	const numbers = [...NON_PRIME_NUMBERS.filter(isNegative), 0]
	numbers.forEach((number) => {
		test(`${number}`, () => {
			const { mainValue: result, divider } = isPrime(number)
			expect(result).toBe(false)
			expect(divider).toBe(undefined)
		})
	})
})
