export const clamp = (value: number, min: number, max: number): number => {
	if (value < min) {
		return min
	}

	if (value > max) {
		return max
	}

	return value
}

export const lerp = (a: number, b: number, alpha: number) => {
	return (1 - alpha) * a + alpha * b
}
