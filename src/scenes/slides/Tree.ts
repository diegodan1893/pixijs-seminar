import { Slide } from "./Slide"
import { Text, Texture } from "pixi.js"
import { SpriteEntity } from "@/entities/SpriteEntity"
import blue from "@/assets/tree/blue.png"
import orange from "@/assets/tree/orange.png"

class Box extends SpriteEntity {
	private coordinates: Text

	constructor(texture: Texture) {
		super(texture)

		this.coordinates = new Text("(0, 0)", {
			fontFamily: "Roboto",
			fontSize: 40,
		})
		this.coordinates.x = this.width
		this.addChild(this.coordinates)
	}

	protected tick(_elapsedSeconds: number): void {
		const newText = `(${Math.round(this.x)}, ${Math.round(this.y)})`

		if (this.coordinates.text !== newText) {
			this.coordinates.text = newText
		}
	}
}

export class Tree extends Slide {
	get assetManifest() {
		return {
			assets: { blue, orange },
		}
	}

	protected async start(): Promise<void> {
		const blue = new Box(this.assets.blue)
		blue.visible = false
		this.addEntity(blue)

		const orange = new Box(this.assets.orange)
		orange.visible = false
		this.addEntity(orange, blue)

		await blue.fade(1, this.defaultTransitionDurationSeconds)
		await this.app.waitForClick()
		await blue.move(this.app.halfWidth, this.app.halfHeight, 1)
		await this.app.waitForClick()
		await orange.fade(1, this.defaultTransitionDurationSeconds)
		await this.app.waitForClick()
		await orange.move(-60, -60, 1)
		await this.app.waitForClick()
		await blue.move(blue.x - 60, blue.y - 60, 1)
		await this.app.waitForClick()
		await blue.rotate(360 * 3, 3)
		await this.app.waitForClick()
		await orange.rotate(360 * 3, 3)
		await this.app.waitForClick()
		await blue.fade(0, 0.5)
		await blue.fade(1, 0.5)
		await blue.fade(0, 0.5)
		await blue.fade(1, 0.5)
		await blue.fade(0, 0.5)
		await blue.fade(1, 0.5)
		await this.app.waitForClick()
		await orange.fade(0, 0.5)
		await orange.fade(1, 0.5)
		await orange.fade(0, 0.5)
		await orange.fade(1, 0.5)
		await orange.fade(0, 0.5)
		await orange.fade(1, 0.5)
		await this.app.waitForClick()
		await blue.fade(0.5, this.defaultTransitionDurationSeconds)
	}
}
