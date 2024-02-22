import { Container } from "pixi.js"
import { Interpolator } from "./Interpolator"
import { easeInOutCubic } from "@/math/Easing"
import { Bezier } from "bezier-js"

export class Entity extends Container {
	protected interpolators: Set<Interpolator>

	constructor() {
		super()

		this.interpolators = new Set()
	}

	get halfWidth(): number {
		return Math.round(this.width / 2)
	}

	get halfHeight(): number {
		return Math.round(this.height / 2)
	}

	fade(
		targetAlpha: number,
		durationSeconds: number,
		easingFunction = easeInOutCubic
	): Promise<void> {
		if (!this.visible) {
			this.alpha = 0
		}

		return new Promise((resolve) => {
			this.visible = true
			this.interpolators.add(
				new Interpolator(
					this.alpha,
					targetAlpha,
					durationSeconds,
					(newAlpha) => (this.alpha = newAlpha),
					() => {
						if (this.alpha === 0) {
							this.visible = false
						}

						resolve()
					},
					easingFunction
				)
			)
		})
	}

	move(
		x: number,
		y: number,
		durationSeconds: number,
		easingFunction = easeInOutCubic
	): Promise<void> {
		return new Promise((resolve) => {
			this.interpolators.add(
				new Interpolator(
					this.x,
					x,
					durationSeconds,
					(newX) => (this.x = newX),
					resolve,
					easingFunction
				)
			)
			this.interpolators.add(
				new Interpolator(
					this.y,
					y,
					durationSeconds,
					(newY) => (this.y = newY),
					undefined,
					easingFunction
				)
			)
		})
	}

	followPath(
		bezier: Bezier,
		durationSeconds: number,
		easingFunction = easeInOutCubic
	): Promise<void> {
		return new Promise((resolve) => {
			this.interpolators.add(
				new Interpolator(
					0,
					1,
					durationSeconds,
					(alpha: number) => {
						const point = bezier.get(alpha)
						this.x = point.x
						this.y = point.y
					},
					resolve,
					easingFunction
				)
			)
		})
	}

	resize(
		x: number,
		y: number,
		durationSeconds: number,
		easingFunction = easeInOutCubic
	): Promise<void> {
		return new Promise((resolve) => {
			this.interpolators.add(
				new Interpolator(
					this.scale.x,
					x,
					durationSeconds,
					(newX) => (this.scale.x = newX),
					resolve,
					easingFunction
				)
			)
			this.interpolators.add(
				new Interpolator(
					this.scale.y,
					y,
					durationSeconds,
					(newY) => (this.scale.y = newY),
					undefined,
					easingFunction
				)
			)
		})
	}

	rotate(
		targetAngle: number,
		durationSeconds: number,
		easingFunction = easeInOutCubic
	): Promise<void> {
		return new Promise((resolve) => {
			this.interpolators.add(
				new Interpolator(
					this.angle,
					targetAngle,
					durationSeconds,
					(newAngle) => (this.angle = newAngle),
					resolve,
					easingFunction
				)
			)
		})
	}

	skipAllTransitions() {
		this.interpolators.forEach((interpolator) => interpolator.skip())
		this.interpolators.clear()
	}

	/**
	 * Called every frame. Updates all the running animations and calls the
	 * `tick` function.
	 *
	 * Implement custom tick behavior by overriding `tick` instead of this one.
	 *
	 * @param elapsedSeconds Time elapsed since the last call
	 */
	update(elapsedSeconds: number) {
		this.interpolators.forEach((interpolator) => {
			interpolator.update(elapsedSeconds)
			if (interpolator.ended) {
				// Deleting elements of a set while iterating it is safe
				// according to the spec
				this.interpolators.delete(interpolator)
			}
		})

		this.tick(elapsedSeconds)
	}

	/**
	 * Called every frame. Override in child classes to implement custom tick
	 * behavior.
	 *
	 * @param elapsedSeconds Time elapsed since the last call
	 */
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	protected tick(elapsedSeconds: number): void {}
}
