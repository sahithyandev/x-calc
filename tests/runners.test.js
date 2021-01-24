import * as RUNNERS_OBJ from "./../src/runners/index.js"

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
