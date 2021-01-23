import { Runner } from "../models/index.js"
import { multiply } from "../utils.js"
import { isPrime } from "./is-prime.mjs"

const meta = {
	name: "facorize",
	description: "Factorize a number",
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

	const [result, divider1] = isPrime(n)

	if (result) return [n]

	const primeFactors = []
	const divider2 = n / divider1

	primeFactors.push(...primeFactorize(divider1))
	primeFactors.push(...primeFactorize(divider2))

	return primeFactors
}

/**
 * @param {object} primePowers
 */
const factorsFromPrimePowers = (primePowers) => {
	const _primePowersArray = Object.keys(primePowers).map((key) => [
		key,
		primePowers[key],
	]) // Object.entries()
	const primeBases = Object.keys(primePowers).map((v) => parseInt(v))
	const primePowerValues = _primePowersArray.map((_) => _[1])
	const highestPower = Math.max(...primePowerValues)

	// if (highestPower == 0) return [1]
	if (highestPower == 1) return [1, ...primeBases]

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

	return factors
}

/**
 * @typedef FactorizeOutputObj
 * @property {number[]} factors
 * @property {number[]} primeFactors
 * @property {object} primePowers
 */

/**
 * @exports FactorizeOutputObj
 */
export const factorize = new Runner(
	/**
	 * @param {number} n
	 *
	 * @exports FactorizeOutputObj
	 */
	(n) => {
		// get factors
		if (n <= 0) return
		if (n === 1) return { factors: [1] }

		const primeFactors = primeFactorize(n)
		const primePowers = extractPowers(primeFactors)
		const factors = factorsFromPrimePowers(primePowers)

		return {
			factors,
			primeFactors,
			primePowers,
		}
	},
	meta,
)

// new Array(100).fill(0).map((_, _i) => {
//   const i = _i + 1
//   console.time(i)
//   console.log(factorize(i))
//   // factorsCountObj[i] = factorize(i).factors.length
//   console.timeEnd(i)
//   return i
// })
// console.time("220")
// console.log(factorize(220))
// console.timeEnd("220")
// console.time("432")
// console.log(factorize(432))
// console.timeEnd("432")
// console.time("432425941")
// console.log(factorize(432425941))
// console.timeEnd("432425941")
