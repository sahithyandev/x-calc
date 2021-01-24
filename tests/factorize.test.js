import { factorize } from "../src/runners/factorize"

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]
describe("factorize: primes", () => {
	PRIMES.forEach((prime) => {
		test(`${prime}`, () => {
			const result = factorize(prime)
			expect(result.factors).toStrictEqual([1, prime])
			expect(result.inPrimes).toStrictEqual([prime])
			expect(result.primeFactors).toStrictEqual([prime])
			expect(result.primePowers).toStrictEqual({
				[prime]: 1,
			})
		})
	})
})

const NON_PRIMES = {
	6: {
		factors: [1, 2, 3, 6],
		primeFactors: [2, 3],
		inPrimes: [2, 3],
		primePowers: {
			2: 1,
			3: 1,
		},
	},
	8: {
		factors: [1, 2, 4, 8],
		primeFactors: [2],
		inPrimes: [2, 2, 2],
		primePowers: {
			2: 3,
		},
	},
	9: {
		factors: [1, 3, 9],
		primeFactors: [3],
		inPrimes: [3, 3],
		primePowers: {
			3: 2,
		},
	},
	10: {
		factors: [1, 2, 5, 10],
		inPrimes: [2, 5],
		primeFactors: [2, 5],
		primePowers: {
			2: 1,
			5: 1,
		},
	},
	30: {
		factors: [1, 2, 3, 5, 6, 10, 15, 30],
		inPrimes: [2, 3, 5],
		primeFactors: [2, 3, 5],
		primePowers: {
			2: 1,
			3: 1,
			5: 1,
		},
	},
}

describe("factorize: non-primes", () => {
	Object.keys(NON_PRIMES).forEach((number) => {
		test(`${number}`, () => {
			const result = factorize(number)
			expect(result).toStrictEqual(NON_PRIMES[number])
		})
	})
})
