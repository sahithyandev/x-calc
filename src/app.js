import { evaluate } from "./utils"
import * as _FUNCTIONS from "../src/runners/index"

const FUNCTIONS = Object.keys(_FUNCTIONS).map((key) => {
	const _ = _FUNCTIONS[key]
	window[key] = _
	return _
})
console.log(FUNCTIONS)

const _STATE = {
	inputString: "",
	callbacks: {
		set: {
			inputString: (oldValue, newValue) => {
				document.getElementById("input-display").value = newValue
				updateOutput(newValue)
			},
		},
	},
}

console.log("Q", _STATE)
const STATE = new Proxy(_STATE, {
	get: function (target, prop, receiver) {
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

const createButton = (text) => {
	const button = document.createElement("button")
	button.innerHTML = text

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
			return createButton(buttonObj.displayText)
		}),
	)

	{
		const equalButton = document.createElement("button")
		equalButton.innerHTML = "="
		equalButton.id = "equal-button"
		equalButton.style.setProperty("--background-color", "var(--theme-color)")
		container.append(equalButton)
	}
	console.log(container)

	container.onclick = (event) => {
		console.log(event)
	}
}

function addFunctionButtons() {
	const container = document.querySelector("#function-buttons")

	container.append(
		...FUNCTIONS.map((functionObj) => {
			const name = functionObj.meta.name
			return createButton(name)
		}),
	)

	container.onclick = (event) => {
		console.log("function-buttons", event)
	}
}

document.body.onload = () => {
	STATE.inputString = "is-prime(10)"
	addFunctionButtons()
	addBasicButtons()
}

/**
 * @param {Event} event
 */
function updateOutput(newInputString) {
	const outputDisplay = document.getElementById("output-display")
	outputDisplay.innerHTML = evaluate(newInputString).value
}

document
	.getElementById("input-display")
	?.addEventListener("change", (event) => {
		STATE.inputString = event.target.value
	})
