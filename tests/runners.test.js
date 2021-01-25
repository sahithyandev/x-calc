import * as RUNNERS_OBJ from "./../src/runners/index.js"
import { evaluate } from "./../src/utils"

const RUNNERS_ARRAY = Object.keys(RUNNERS_OBJ).map((key) => [
	key,
	RUNNERS_OBJ[key],
])

describe("Runner.meta", () => {
	RUNNERS_ARRAY.forEach(([runnerName, runnerFunc]) => {
		test(runnerName, () => {
			expect(runnerFunc.meta).not.toBe(undefined)
			// TODO write tests for properties of meta
		})
	})
})

describe("Runner: return type", () => {
	RUNNERS_ARRAY.forEach(([runnerName, runnerFunc]) => {
		test(runnerName, () => {
			// adding the functions to global scope
			global[runnerName] = runnerFunc
			// and calling the usage code example
			const q = evaluate(runnerFunc.meta.usage.replace(/~/g, ""))
			expect(q.mainValue).not.toBe(undefined)
		})
	})
})
