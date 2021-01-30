import { iSet } from "./iSet.js"

class NumberedSet extends Set {
	/**
	 * @param {Iterable} iterable
	 */
	constructor(iterable) {
		const namedItems = NumberedSet._nameItems(iterable)
		super(namedItems)
	}

	/**
	 * @private
	 * @description Runs when a NamedSet is created. Names every element in `item<item_index>` format
	 *
	 * @param {Iterable} iterable
	 * @returns {string[]}
	 */
	static _nameItems(iterable) {
		const itemCountObj = NumberedSet._countItems(iterable)
		const namedItems = []
		Object.entries(itemCountObj).forEach(([itemName, itemCount]) => {
			for (let item_i = 0; item_i < itemCount; item_i++) {
				namedItems.push(`${itemName}<${item_i}>`)
			}
		})

		return namedItems
	}

	/**
	 * @private
	 * @description Decodes the named items into nameless items
	 * @param {Iterable<string>} iterable
	 */
	static _decodeNamedItems(iterable) {
		const indexRemovedItems = Array(...iterable).map((item) =>
			item.replace(/<\d+>/, ""),
		)
		// check if the items are numbers or can be turned into numbers
		const isFilledWithNumbers = indexRemovedItems.every((item) => {
			return typeof item === "number" || !isNaN(+item)
		})
		return indexRemovedItems.map((item) => (isFilledWithNumbers ? +item : item))
	}

	/**
	 * @description Counts the number of duplicates in the iterable.
	 * @param {Iterable} iterable
	 * @returns {Object}
	 */
	static _countItems(iterable) {
		const _array = new Array(...iterable)
		const countObj = {}
		for (let item_i in _array) {
			const item = _array[item_i]
			if (countObj[item] !== undefined) {
				countObj[item] = countObj[item] + 1
			} else {
				countObj[item] = 1
			}
		}

		return countObj
	}

	/**
	 * @param {NumberedSet} otherNumberedSet
	 *
	 * @returns {Array}
	 */
	intersectionWith(otherNumberedSet) {
		const _intersection = new iSet(this).intersectionWith(
			new iSet(otherNumberedSet),
		)

		return NumberedSet._decodeNamedItems(_intersection)
	}
}

// const x = new NumberedSet([2, 2, 3, 5, 5])
// const y = new NumberedSet([2, 5, 2, 7])
// console.log(x, y) // expected form ["2<0>", "2<1>", "3<0>", "5<0>", "5<1>"]
// console.log(x.intersectionWith(y)) // expected [2,2,5]
