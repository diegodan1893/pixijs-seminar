import { easeInOutCubic } from "@/math/Easing"
import { lerp } from "@/math/Operations"

export class Interpolator {
	private runTimeSeconds: number = 0

	constructor(
		private startValue: number,
		private endValue: number,
		private durationSeconds: number,
		private onUpdate: (interpolatedValue: number) => void,
		private onEnd: () => void = () => {},
		private easingFunction: (progress: number) => number = easeInOutCubic
	) {}

	get ended(): boolean {
		return this.runTimeSeconds === this.durationSeconds
	}

	update(elapsedSeconds: number) {
		this.runTimeSeconds = Math.min(
			this.runTimeSeconds + elapsedSeconds,
			this.durationSeconds
		)

		const progress = this.runTimeSeconds / this.durationSeconds
		const value = lerp(
			this.startValue,
			this.endValue,
			this.easingFunction(progress)
		)

		this.onUpdate(value)

		if (this.ended) {
			this.onEnd()
		}
	}

	skip() {
		this.runTimeSeconds = this.durationSeconds
		this.onUpdate(
			lerp(this.startValue, this.endValue, this.easingFunction(1))
		)
		this.onEnd()
	}
}
