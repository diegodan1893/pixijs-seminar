import { SpriteEntity } from "@/entities/SpriteEntity"
import { Slide } from "./Slide"
import { Point } from "pixi.js"
import blue from "@/assets/tree/blue.png"
import noWait from "@/assets/animations/noWait.png"
import withWait from "@/assets/animations/withWait.png"
import interpolator from "@/assets/animations/interpolator.png"
import rotate from "@/assets/animations/rotate.png"

export class AnimationsExample extends Slide {
	get assetManifest() {
		return {
			assets: {
				blue,
				noWait,
				withWait,
				interpolator,
				rotate,
			},
		}
	}

	protected async start(): Promise<void> {
		const start = new Point(300, 300)
		const end = new Point(this.app.width - 300, 300)
		const animationDurationSeconds = 3

		const codeAnchor = new Point(0.5, 0.5)
		const codePosition = new Point(
			this.app.halfWidth,
			this.app.height - 400
		)

		const entity = new SpriteEntity(this.assets.blue)
		entity.sprite.anchor.set(0.5)
		entity.position = start.clone()
		entity.visible = false
		this.addEntity(entity)

		await entity.fade(1, this.defaultTransitionDurationSeconds)

		await this.app.waitForClick()

		entity.move(end.x, end.y, animationDurationSeconds)
		await entity.rotate(360, animationDurationSeconds)

		await this.app.waitForClick()

		await this.showImage(this.assets.noWait, codeAnchor, codePosition)

		await entity.move(start.x, start.y, animationDurationSeconds)
		await entity.rotate(0, animationDurationSeconds)

		await this.showImage(this.assets.withWait, codeAnchor, codePosition)

		await this.showLeftAlignedImage(this.assets.interpolator)
		await this.showLeftAlignedImage(this.assets.rotate, false)
	}
}
