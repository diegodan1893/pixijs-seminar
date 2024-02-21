// Source:
// https://easings.net/

export const linear = (x: number): number => x

export const easeInCubic = (x: number): number => {
	return x * x * x
}

export const easeOutCubic = (x: number): number => {
	return 1 - Math.pow(1 - x, 3)
}

export const easeInOutCubic = (x: number): number => {
	return x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2
}
