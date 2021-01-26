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
