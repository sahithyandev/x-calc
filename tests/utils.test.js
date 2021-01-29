import { multiply, evaluate } from "../src/utils"

// describe("fn: multiply, correct cases", () => {
// 	const CORRECT_TEST_CASES = [
// 		{ input: [], output: 1 },
// 		{ input: [1], output: 1 },
// 		{ input: [1, 2, 3, 4, 5], output: 120 },
// 		{ input: [-1, -2, -3, -4, -5], output: -120 },
// 		{ input: [1, 2, 3, 0], output: 0 },
// 	]

// 	CORRECT_TEST_CASES.forEach((obj) => {
// 		test(`${obj.input}`, () => {
// 			expect(multiply(obj.input)).toBe(obj.output)
// 		})
// 	})
// })

// describe("fn: multiply, error cases", () => {
// 	const ERROR_CASES = [
// 		{
// 			input: ["1", 1, 2, 3, 0],
// 			errorMessage: "Only numbers can be multiplied",
// 		},
// 	]

// 	ERROR_CASES.forEach((obj) => {
// 		test(`${obj.input}`, () => {
// 			expect(multiply(obj.input)).toThrow(obj.errorMessage)
// 		})
// 	})
// })

// TODO IMPORTANT
// describe("fn: evaluate", () => {
// 	const TEST_CASES = [{ input: "0.2+0.1", output: "0.3" }, { input: "0.1+0.1+0.1", output: "0.3" }]

// 	TEST_CASES.forEach((obj) => {
// 		test(`${obj.input}`, () => {
// 			expect(evaluate(obj.input) + "").toBe(obj.output)
// 		})
// 	})
// })
