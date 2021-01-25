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
			inputString: () => {
				updateOutput()
			},
		},
	},
}

console.log(_STATE)
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

const createButton = (text, onClick) => {
	const button = document.createElement("button")
	button.innerHTML = text
	button.onclick = onClick

	return button
}

/**
 * @param {string} inputString
 */
const evaluate = (inputString) => {
	try {
		inputString = inputString
			.replace(/-(\w)/, (v) => v.toUpperCase())
			.replace(/-/, "")
		console.log(inputString)
		return eval(inputString)
	} catch (error) {
		console.warn(error)
		// TODO show it to the user
		return error
	}
}

function addBasicButtons() {
	const container = document.querySelector(".basic-buttons")
	const buttons = [{ name: "add", displayText: "+" }] // TODO fill it

	container.onclick = (event) => {
		console.log(event)
	}
	// document.querySelector(container).append()
}

function addFunctionButtons() {
	const container = document.querySelector(".function-buttons")
	const functionButtons = FUNCTIONS.map((functionObj) => {
		return {
			...functionObj.meta,
			runner: functionObj,
		}
	})

	console.log(functionButtons)

	container.onclick = (event) => {
		console.log("function-buttons", event)
	}
}

document.body.onload = () => {
	addFunctionButtons()
}

/**
 * @param {Event} event
 */
function updateOutput(event) {}

document.getElementById("input-display").addEventListener("change", (event) => {
	console.log(event)
})
