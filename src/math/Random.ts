/**
 * Returns a random number in the range [start, end)
 */
export const randomInRange = (start: number, end: number): number => {
	return Math.random() * (end - start) + start
}

export const shuffle = <T>(array: T[]) => {
	const shuffled: T[] = array.slice()

	for (let i = 0; i < shuffled.length; ++i) {
		const j = Math.floor(randomInRange(i, shuffled.length))
		const temp = shuffled[i]
		shuffled[i] = shuffled[j]
		shuffled[j] = temp
	}

	return shuffled
}

export const randomInList = <T>(list: T[]): T => {
	return list[Math.floor(randomInRange(0, list.length))]
}

export interface ItemWithChance<T> {
	value: T
	chance: number
}

export const weightedRandomSelection = <T>(items: ItemWithChance<T>[]) => {
	let randomNumber = Math.random()

	for (const { value, chance } of items) {
		if (randomNumber < chance) {
			return value
		}
		randomNumber -= chance
	}

	throw Error("The probabilities don't add up to 1.")
}

export const randomBool = (chance: number): boolean => {
	return Math.random() < chance
}
