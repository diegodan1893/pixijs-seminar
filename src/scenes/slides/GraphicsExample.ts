import { Graphics } from "pixi.js"
import { Slide } from "./Slide"
import graphics from "@/assets/graphics/graphics.png"

export class GraphicsExample extends Slide {
	get assetManifest() {
		return {
			assets: { graphics },
		}
	}

	protected async start(): Promise<void> {
		await this.addTitle("Graphics")

		await this.showLeftAlignedImage(this.assets.graphics, false)

		const rectangle = new Graphics()
		rectangle.beginFill(0xff0000)
		rectangle.drawRect(
			this.app.width - 600,
			this.app.halfHeight - 50,
			200,
			100
		)
		this.addChild(rectangle)
	}
}
