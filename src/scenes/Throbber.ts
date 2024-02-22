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
	private showTimeout?: ReturnType<typeof setTimeout>
	private showDelaySeconds: number = 0.1

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

	skipAllTransitions() {
		if (this.showTimeout) {
			clearTimeout(this.showTimeout)
			this.showTimeout = undefined
		}

		super.skipAllTransitions()
	}

	async transitionIn() {
		this.skipAllTransitions()

		// Delay showing the spinner to avoid flashing the image
		// if the load time is short enough.
		// We use a timeout instead of awaiting sleep to allow cancelling
		// the transition if transitionOut gets called before it completes.
		this.showTimeout = setTimeout(
			() => this.fade(1, this.defaultTransitionDurationSeconds),
			this.showDelaySeconds * 1000
		)
	}

	async transitionOut() {
		this.skipAllTransitions()

		if (this.alpha > 0) {
			await this.fade(0, this.defaultTransitionDurationSeconds)
		}
	}
}
