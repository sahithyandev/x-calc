import { factors as TEST_FUNCTION } from "../src/runners/factors"

import { PRIMES } from "./NUMBERS"

describe(`${TEST_FUNCTION.meta.name}: primes`, () => {
	PRIMES.forEach((prime) => {
		test(`${prime}`, () => {
			const {
				mainValue: factors,
				inPrimes,
				primeFactors,
				primePowers,
			} = TEST_FUNCTION(prime)
			expect(factors).toStrictEqual([1, prime])
			expect(inPrimes).toStrictEqual([prime])
			expect(primeFactors).toStrictEqual([prime])
			expect(primePowers).toStrictEqual({
				[prime]: 1,
			})
		})
	})
})

const NON_PRIMES = {
	6: {
		mainValue: [1, 2, 3, 6],
		primeFactors: [2, 3],
		inPrimes: [2, 3],
		primePowers: {
			2: 1,
			3: 1,
		},
	},
	8: {
		mainValue: [1, 2, 4, 8],
		primeFactors: [2],
		inPrimes: [2, 2, 2],
		primePowers: {
			2: 3,
		},
	},
	9: {
		mainValue: [1, 3, 9],
		primeFactors: [3],
		inPrimes: [3, 3],
		primePowers: {
			3: 2,
		},
	},
	10: {
		mainValue: [1, 2, 5, 10],
		inPrimes: [2, 5],
		primeFactors: [2, 5],
		primePowers: {
			2: 1,
			5: 1,
		},
	},
	30: {
		mainValue: [1, 2, 3, 5, 6, 10, 15, 30],
		inPrimes: [2, 3, 5],
		primeFactors: [2, 3, 5],
		primePowers: {
			2: 1,
			3: 1,
			5: 1,
		},
	},
}

describe(`${TEST_FUNCTION.meta.name}: non-primes`, () => {
	Object.keys(NON_PRIMES).forEach((number) => {
		test(`${number}`, () => {
			const result = TEST_FUNCTION(number)
			expect(result).toStrictEqual(NON_PRIMES[number])
		})
	})
})
