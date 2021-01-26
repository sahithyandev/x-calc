/**
 * @param {number[]} numbers
 *
 * @returns {number}
 */
export const multiply = (numbers) => {
	return numbers.reduce((prev, current) => prev * current)
}

/**
 * @param {T} func The function to be memoized
 * @param {Function} keyResolver This function will be used to create the key of each cache. if not defined, first argument will be used.
 *
 * @returns {T}
 * @template T
 */
export const memoize = (func, keyResolver) => {
	const _cacheStore = new Map()

	return (...args) => {
		const key = keyResolver ? keyResolver.apply(null, args) : args[0]

		if (_cacheStore.has(key)) {
			return _cacheStore.get(key)
		}
		const result = func.apply(null, args)
		_cacheStore.set(key, result)
		return result
	}
}

/**
 * @param {string} inputString
 */
export const evaluate = (inputString) => {
	try {
		const _inputString = inputString.replace(/-([a-zA-Z])/, (v) =>
			v.slice(1).toUpperCase(),
		)
		return eval(_inputString)
	} catch (error) {
		console.warn("function called from calculator wrong format", error)
		return { error }
	}
}
