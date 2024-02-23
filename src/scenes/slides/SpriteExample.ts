import { Point } from "pixi.js"
import { Slide } from "./Slide"
import balloon from "@/assets/balloon/balloon.png"

export class SpriteExample extends Slide {
	get assetManifest() {
		return { assets: { balloon } }
	}

	protected async start(): Promise<void> {
		await this.addTitle("Sprites")
		await this.showImage(
			this.assets.balloon,
			new Point(0.5, 0.5),
			new Point(this.app.halfWidth, this.app.halfHeight),
			false
		)
	}
}
