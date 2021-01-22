import { multiply } from "../utils.js"
import { Runner } from "./../models/index.js"
import { factorize } from "./factorize.js"

const meta = {
  name: "GCD",
  long_name: "Greatest Common Divisor",
  description: "",
}

/**
 * @param {any[]} array
 * @param {number} chunkLength
 * @param {any} chunkFill if a chunk is less than the specified length, then this value will be used to fill it. Ignore this to stop it from doing so
 * @exports any[][]
 *
 * @description Chunks an array into small arrays with specified length
 */
function chunkArray(array, chunkLength = 2, chunkFill) {
  // do the chunk filling
  if (chunkFill && array.length % chunkLength !== 0) {
    const fillCount = chunkLength - (array.length % chunkFill)
    array.push(new Array(fillCount).fill(chunkFill))
  }

  const chunks = []
  while (array.length) {
    chunks.push(array.splice(0, chunkLength))
  }

  return chunks
}

const _GCD_FUNC_OLD = (...numbers) => {
  const _self = GCD
  if (numbers.length == 2) {
    const [a, b] = numbers
    if (a == b) {
      return 0
    }
    if (a == 0 || b == 0) {
      return a || b // return which is not zero
    }
    if (a > b) {
      return _self(a - b, b)
    }
    return _self(a, b - a)
  }

  const chunkenArray = chunkArray(numbers, 2, 0)
  return chunkenArray.map((chunk) => runner(...chunk))
}

/**
 * @param {Set<number>} A
 * @param {Set<number>} B
 */
function setIntersection(A, B) {
  let _intersection = new Set()
  for (let elem of B) {
    if (A.has(elem)) {
      _intersection.add(elem)
    }
  }
  return _intersection
}

/**
 * @typedef GCDOutputObj
 *
 * @property
 */

export const gcd = new Runner(
  /**
   * @param {number[]} numbers
   * @exports number
   */
  (...numbers) => {
    if (numbers.length < 1) {
      throw new Error("gcd: requires atleast two numbers")
    }
    if (numbers.length > 2) {
      // calculate gcd of the first two numbers
      let f2 = gcd(numbers[0], numbers[1]).value

      return gcd(f2, ...numbers.slice(2))
    }

    if (numbers.length === 2) {
      const [a, b] = numbers
      if (a == b) {
        return 0
      }
      if (a == 0 || b == 0) {
        return a || b // return which is not zero
      }

      // get primeFactors of the numbers
      // then name every factor to do the set intersection
      const primeFactors = numbers.map((v) => {
        const primePowers = factorize(v).primePowers

        const entries = Object.keys(primePowers).map((key) => [
          key,
          primePowers[key],
        ])

        const namedFactors = []
        entries.forEach(([powerBase, powerValue]) => {
          for (let power_i = 0; power_i < powerValue; power_i++) {
            namedFactors.push(`${powerBase}<${power_i}>`)
          }
        })

        return new Set(namedFactors)
      })

      /**
       * @param {string} factorName
       * @exports string
       */
      const removeFactorName = (factorName) => factorName.replace(/<\d+>/, "")

      const intersectionArray = Array.from(
        setIntersection(primeFactors[0], primeFactors[1]),
      )
        .map(removeFactorName)
        .map((v) => parseInt(v))
      return {
        value: multiply(...intersectionArray),
        valueAsPrimeFactors: intersectionArray,
      }
    }
  },
  meta,
)

// console.log(gcd(10, 40), 10)
// console.log(gcd(100, 40), 20)
// console.log(gcd(100, 40, 15), 5)
// console.log(gcd(100, 40, 32), 4)
// console.log(gcd(100, 40, 140, 25), 5)
