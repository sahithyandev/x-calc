import { multiply, memoize } from "../utils.js"
import { isPrime } from "./is-prime.js"

const meta = {
	name: "factorize",
	description: "Factorize a number",
	usage: "factorize(~48~)",
}

/**
 * @param {number[]} numbers
 */
function extractPowers(numbers) {
	const powersObj = {}

	for (let n of numbers) {
		if (n in powersObj) {
			powersObj[n]++
		} else {
			powersObj[n] = 1
		}
	}

	return powersObj
}

/**
 * @description Factorizes a number into primes
 */
function primeFactorize(n) {
	if (n < 2) return

	const { mainValue: isPrimeResult, divider: divider1 } = isPrime(n)

	if (isPrimeResult) return [n]

	const primeFactors = []
	const divider2 = n / divider1

	primeFactors.push(...primeFactorize(divider1))
	primeFactors.push(...primeFactorize(divider2))

	return primeFactors
}

/**
 * @param {object} primePowers
 *
 * @returns {number[]}
 */
const factorsFromPrimePowers = (primePowers) => {
	const _primePowersArray = Object.keys(primePowers).map((key) => [
		key,
		primePowers[key],
	]) // Object.entries()
	const primeBases = Object.keys(primePowers).map((v) => parseInt(v))
	const primePowerValues = _primePowersArray.map((_) => _[1])
	const highestPower = Math.max(...primePowerValues)

	let factorsInPowers = []
	const factors = []

	// CAUTION: NON_READBLE CODE
	//
	{
		{
			// generate factors in powers, first.
			// it will generate some non-factors too.
			// but they will be removed in the next block
			const iteratingPowerArray = new Array(_primePowersArray.length).fill(0)
			while (
				iteratingPowerArray[iteratingPowerArray.length - 1] <= highestPower
			) {
				factorsInPowers.push([...iteratingPowerArray])

				iteratingPowerArray[0]++
				for (let i = 0; i < iteratingPowerArray.length - 1; i++) {
					if (iteratingPowerArray[i] > highestPower) {
						iteratingPowerArray[i] = 0
						iteratingPowerArray[i + 1]++
					}
				}
			}
		}

		{
			// now, removing the non-factors
			// loop over the factors
			for (let factorInPowers_i in factorsInPowers) {
				const factorInPowers = factorsInPowers[factorInPowers_i]

				// then loop over the powerValues of a factor
				// to check if it's correct
				const isCorrectFactor = factorInPowers.every(
					(power, i) => power <= primePowerValues[i],
				)

				if (isCorrectFactor) {
					// to get the actual factor's value
					// 1. apply the powers to the primeBases (done by map)
					// 2. multiply them (done by multiply function)
					const factorValue = multiply(
						factorInPowers.map((power, i) => primeBases[i] ** power),
					)

					factors.push(factorValue)
				} else {
					factorsInPowers[factorInPowers_i] = undefined
				}
			}
		}
		// not necessary; but may be needed in the future
		factorsInPowers = factorsInPowers.filter((v) => v !== undefined)
	}

	return factors.sort((a, b) => a - b)
}

/**
 * @typedef FactorizeOutputObj
 * @property {number[]} factors
 * @property {number[]} primeFactors
 * @property {object} primePowers
 */

export const factorize = memoize(
	/**
	 * @param {number} n
	 *
	 * @returns {FactorizeOutputObj}
	 */
	(n) => {
		if (n <= 0) return null
		if (n === 1) return { factors: [1] }

		const primeFactorization = primeFactorize(n)
		const primePowers = extractPowers(primeFactorization)
		const factors = factorsFromPrimePowers(primePowers)

		return {
			mainValue: factors,
			inPrimes: primeFactorization,
			primeFactors: Object.keys(primePowers).map((v) => parseInt(v)),
			primePowers,
		}
	},
)
factorize.meta = meta
