import { ratio as TEST_FUNCTION } from "./../src/runners/index.js"

describe(`${TEST_FUNCTION.meta.name}: normal-tests`, () => {
	const CASES = [
		{
			input: [1, 2],
			output: [1, 2],
		},
		{ input: [3, 4], output: [3, 4] },
		{ input: [4, 5], output: [4, 5] },
		{ input: [2, 6], output: [1, 3] },
		{ input: [50, 100], output: [1, 2] },
		{ input: [50, 100, 10], output: [5, 10, 1] },
		{ input: [5, 10, 50, 100], output: [1, 2, 10, 20] },
	]

	CASES.map((_) => {
		// TODO find a suitable name
		test(`${_.input.join(", ")}`, () => {
			expect(TEST_FUNCTION(..._.input).mainValue).toStrictEqual(_.output)
		})
	})
})
