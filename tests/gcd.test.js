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
