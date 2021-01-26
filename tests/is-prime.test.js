import { isPrime } from "./../src/runners/is-prime"

import { PRIMES, NON_PRIME_NUMBERS } from "./NUMBERS"

describe("is-prime: primes", () => {
	PRIMES.forEach((number) => {
		test(`${number}`, () => {
			const { mainValue: result, divider } = isPrime(number)
			expect(result).toBe(true)
			expect(divider).toBe(null)
		})
	})
})

describe("is-prime: non-primes", () => {
	NON_PRIME_NUMBERS.forEach((number) => {
		test(`${number}`, () => {
			const { mainValue: result, divider } = isPrime(number)
			expect(result).toBe(false)
			expect(divider).not.toBe(null)
		})
	})
})
