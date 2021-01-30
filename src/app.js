// import { create, all } from "mathjs/number"
import { evaluate, debounce, findHyphenPositions } from "./utils"
import * as _FUNCTIONS from "../src/runners/index"
import { all } from "mathjs"

// const MathJs = create(all)
// const MathParser = MathJs.parser()
// window["MathParser"] = MathParser
// window["MathJs"] = MathJs

// TODO think of a good name
/**
 * @description Normally, those runner functions return an object. This function creates a new instance of those runners which return only thier mainValue
 * @param {Function} runner
 */
const ie = (runner) => {
	const x = function (...args) {
		return runner.apply(null, args).mainValue
	}
	x.meta = runner.meta
	return x
}

const FUNCTIONS = Object.keys(_FUNCTIONS).map((key) => {
	const func = ie(_FUNCTIONS[key])
	window[key] = func
	return func
})
console.log("available functions: ", FUNCTIONS)

/**
 * @description Replaces text selection in a inputElement with another text
 *
 * @param {HTMLInputElement} inputElement
 * @param {string} text
 */
const replaceText = (inputElement, text) => {
	const start = inputElement.selectionStart
	const end = inputElement.selectionEnd
	const allText = inputElement.value

	return allText.substring(0, start) + text + allText.substring(end)
}

const _STATE = {
	inputString: "",
	callbacks: {
		set: {
			/**
			 * @param {string} newValue
			 */
			inputString: (oldValue, newValue) => {
				console.log("i", newValue)
				/** @type {HTMLInputElement} */
				const inputDisplay = document.getElementById("input-display")

				const formattedInputValue = newValue.replace(/~/g, "")
				inputDisplay.value = formattedInputValue

				// TODO select the characters between two ~
				// if (newValue.split("~").length > 2) {
				// 	const [first, last] = findHyphenPositions(newValue)
				// 	// inputDisplay.setSelectionRange(first, last)
				// }
				updateOutput(formattedInputValue)
			},
		},
	},
}

const STATE = new Proxy(_STATE, {
	get: function (target, prop) {
		if (target.callbacks?.get && target.callbacks?.get[prop]) {
			target.callbacks.get[prop].apply(null)
		}

		return target[prop]
	},
	set: function (obj, prop, value) {
		if (obj.callbacks?.set && obj.callbacks?.set[prop]) {
			const oldValue = obj[prop]
			const result = obj.callbacks.set[prop](oldValue, value)

			if (!result && result != undefined) return false
		}
		obj[prop] = value
		return true
	},
})

const createButton = ({ text, id }) => {
	if (!text) throw new Error("Button must have text inside")
	const button = document.createElement("button")
	button.innerHTML = text
	if (id) {
		button.id = id
	} else {
		button.id = text
		console.warn(`button with ${text} doesn't have an id`)
	}

	return button
}

function addBasicButtons() {
	const container = document.querySelector("#basic-buttons")
	const buttons = [
		{ name: "add", displayText: "+" },
		{
			name: "subtract",
			displayText: "-",
		},
		{
			name: "multiply",
			displayText: "*",
		},
		{
			name: "divide",
			displayText: "/",
		},
	]

	container.append(
		...buttons.map((buttonObj) => {
			return createButton({
				text: buttonObj.displayText,
				id: buttonObj.displayText,
			})
		}),
	)

	{
		const equalButton = document.createElement("button")
		equalButton.innerHTML = "="
		equalButton.id = "equal-button"
		equalButton.style.setProperty("--background-color", "var(--theme-color)")
		container.append(equalButton)
	}

	const inputDisplay = document.getElementById("input-display")
	container.onclick = (event) => {
		const replacement = event.target.innerText
		STATE.inputString = replaceText(inputDisplay, replacement)
	}
}

function addFunctionButtons() {
	const container = document.querySelector("#function-buttons")

	container.append(
		...FUNCTIONS.map((functionObj) => {
			const name = functionObj.meta.name
			return createButton({ text: name, id: name })
		}),
	)

	const inputDisplay = document.getElementById("input-display")
	container.onclick = (event) => {
		const buttonId = event.target.id
		const clickedFunction = FUNCTIONS.find((functionObj) => {
			return functionObj.meta.name === buttonId
		})
		const functionUsageExample = clickedFunction.meta.usage
		STATE.inputString = replaceText(inputDisplay, functionUsageExample)
	}
}

document.body.onload = () => {
	STATE.inputString = "is-prime(gcd(100,40))"
	addFunctionButtons()
	addBasicButtons()
}

const calculatorOutputFormatter = (value) => {
	if (value === undefined) return ""
	if (!(value instanceof Object)) {
		return value
	}
	const _value = value.mainValue

	// if array return ", " seperated
	if (_value instanceof Array) {
		return _value.join(", ").concat(`\n[${_value.length}]`)
	}

	// otherwise return normal
	return _value
}

/**
 * @param {string} newInputString
 */
function updateOutput(newInputString) {
	const outputDisplay = document.getElementById("output-display")

	const evaluatedInput = evaluate(newInputString)
	if (evaluatedInput instanceof Object && "error" in evaluatedInput) {
		// it's an error
		outputDisplay.innerHTML = evaluatedInput.error.message
	} else {
		outputDisplay.innerHTML = calculatorOutputFormatter(evaluatedInput)
		// MathJs.format(
		// MathParser.evaluate(newInputString),
		// 	{ precision: 14 },
		// )
		// calculatorOutputFormatter(evaluatedInput)
	}
}

document.getElementById("input-display")?.addEventListener(
	"input",
	debounce((event) => {
		STATE.inputString = event.target.value
	}, 500),
)
