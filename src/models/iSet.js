/**
 * @description Just a simple extension for Set
 */
export class iSet extends Set {
	/**
	 * @param {Iterable} iterable
	 */
	constructor(iterable) {
		super(iterable)
	}

	/**
	 * @param {iSet|Set} otherSet
	 * @returns {iSet}
	 */
	intersectionWith(otherSet) {
		const _intersection = new Set()

		for (let item of this.keys()) {
			if (otherSet.has(item)) {
				_intersection.add(item)
			}
		}

		return new iSet(_intersection)
	}
}
