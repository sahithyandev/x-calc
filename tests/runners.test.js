import * as RUNNERS_OBJ from "./../src/runners/index.js"
import { evaluate, kebabToCamelCase } from "./../src/utils"

const RUNNERS_ARRAY = Object.entries(RUNNERS_OBJ)

describe("runners: meta", () => {
	RUNNERS_ARRAY.forEach(([runnerName, runnerFunc]) => {
		test(runnerName, () => {
			expect(runnerFunc.meta).not.toBe(undefined)
			expect(kebabToCamelCase(runnerFunc.meta.name)).toBe(runnerName)

			expect(runnerFunc.meta.description).not.toBe(undefined)
			expect(runnerFunc.meta.description).not.toBe("")

			expect(runnerFunc.meta.usage).not.toBe(undefined)
			expect(runnerFunc.meta.usage).not.toBe("")
		})
	})
})

describe("runners: return type", () => {
	RUNNERS_ARRAY.forEach(([runnerName, runnerFunc]) => {
		test(runnerName, () => {
			// add the functions to global scope
			global[runnerName] = runnerFunc
			// call the usage code example
			const q = evaluate(runnerFunc.meta.usage.replace(/~/g, ""))
			expect(q.mainValue).not.toBe(undefined)
		})
	})
})
