/**
 * @typedef RunnerMeta
 *
 * @property {string} name
 * @property {string} longName
 * @property {string} description
 */

export default class Runner extends Function {
	/**
	 * @param {Function} runFunction
	 * @param {RunnerMeta} meta
	 */
	constructor(runFunction, meta) {
		super()
		this.meta = meta
		runFunction.meta = meta

		return runFunction
	}
}
