import { Point } from "pixi.js"
import { Slide } from "./Slide"
import { SpriteEntity } from "@/entities/SpriteEntity"
import balloon from "@/assets/balloon/balloon.png"
import mask from "@/assets/masks/mask.png"

export class MasksExample extends Slide {
	get assetManifest() {
		return {
			assets: { balloon, mask },
		}
	}

	protected async start(): Promise<void> {
		await this.addTitle("Masks")

		this.showImage(
			this.assets.mask,
			new Point(0.5, 0.5),
			new Point(600, this.app.halfHeight),
			false
		)

		const balloon = await this.showImage(
			this.assets.balloon,
			new Point(0.5, 0.5),
			new Point(this.app.width - 600, this.app.halfHeight),
			false
		)

		await this.app.waitForClick()

		const mask = new SpriteEntity(this.assets.mask)
		mask.sprite.anchor.set(0.5)
		this.addEntity(mask, balloon)
		balloon.mask = mask.sprite

		await this.app.waitForClick()

		await mask.move(mask.x, mask.y - balloon.height, 1)
		await mask.move(mask.x, mask.y + balloon.height, 1)
	}
}
