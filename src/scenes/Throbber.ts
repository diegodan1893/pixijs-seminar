import { Texture } from "pixi.js"
import { SpriteEntity } from "@/entities/SpriteEntity"
import { Scene } from "./Scene"
import throbberImage from "@/assets/throbber/throbber.png"

class ThrobberSprite extends SpriteEntity {
	private spinSpeedDegreesPerSecond = 360

	constructor(texture: Texture) {
		super(texture)

		this.sprite.anchor.set(0.5)
	}

	protected tick(elapsedSeconds: number): void {
		this.sprite.angle += this.spinSpeedDegreesPerSecond * elapsedSeconds
	}
}

export class Throbber extends Scene {
	get assetManifest() {
		return {
			assets: {
				throbberImage,
			},
		}
	}

	protected async init(): Promise<void> {
		const throbberSprite = new ThrobberSprite(this.assets.throbberImage)
		throbberSprite.position.set(this.app.halfWidth, this.app.halfHeight)
		this.addEntity(throbberSprite)
	}
}
