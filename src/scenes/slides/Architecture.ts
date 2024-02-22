import { Slide } from "./Slide"
import { Point } from "pixi.js"
import umlAppEntity from "@/assets/architecture/umlAppEntity.png"
import umlAppSceneEntity from "@/assets/architecture/umlAppSceneEntity.png"
import app from "@/assets/architecture/app.png"
import balloonEntity from "@/assets/architecture/balloonEntity.png"

export class Architecture extends Slide {
	get assetManifest() {
		return {
			assets: {
				umlAppEntity,
				umlAppSceneEntity,
				app,
				balloonEntity,
			},
		}
	}

	protected async start(): Promise<void> {
		const diagramAnchor = new Point(0.5, 0.5)
		const diagramPosition = new Point(
			this.app.width - 500,
			this.app.halfHeight
		)

		const umlAppEntity = await this.showImage(
			this.assets.umlAppEntity,
			diagramAnchor,
			diagramPosition,
			false
		)

		await this.app.waitForClick()

		await this.showLeftAlignedImage(this.assets.app)
		await this.showLeftAlignedImage(this.assets.balloonEntity)

		await umlAppEntity.fade(0, this.defaultTransitionDurationSeconds)

		const umlAppSceneEntity = await this.showImage(
			this.assets.umlAppSceneEntity,
			diagramAnchor,
			diagramPosition,
			false
		)
		await umlAppSceneEntity.move(this.app.halfWidth, umlAppSceneEntity.y, 1)
	}
}
