import { SpriteEntity } from "@/entities/SpriteEntity"
import { Slide } from "./Slide"
import balloon from "@/assets/balloon/balloon.png"
import html from "@/assets/balloon/html.png"
import createApp from "@/assets/balloon/createApp.png"
import addBallon from "@/assets/balloon/addBalloon.png"
import addAnimation from "@/assets/balloon/addAnimation.png"

class Balloon extends SpriteEntity {
	private amplitude: number = 30
	private cyclesPerSecond: number = 0.5

	private lifetimeSeconds: number = 0

	public paused: boolean = true

	protected tick(elapsedSeconds: number): void {
		if (this.paused) {
			return
		}

		this.lifetimeSeconds += elapsedSeconds

		const speed = this.cyclesPerSecond * 2 * Math.PI
		const sinResult = Math.sin(this.lifetimeSeconds * speed)

		this.sprite.y = this.amplitude * sinResult
	}
}

export class GettingStarted extends Slide {
	get assetManifest() {
		return {
			assets: {
				balloon,
				html,
				createApp,
				addBallon,
				addAnimation,
			},
		}
	}

	protected async start(): Promise<void> {
		const balloon = new Balloon(this.assets.balloon)
		balloon.sprite.anchor.set(0.5)
		balloon.position.set(
			this.app.width + balloon.halfWidth,
			this.app.halfHeight
		)
		this.addEntity(balloon)

		await balloon.move(this.app.halfWidth, balloon.y, 1)
		balloon.paused = false

		await this.app.waitForClick()

		await balloon.fade(0, this.defaultTransitionDurationSeconds)
		balloon.paused = true
		balloon.x = this.app.width - 400

		await this.showCodeBlock(this.assets.html)
		await this.showCodeBlock(this.assets.createApp)

		const addBallon = await this.showCodeBlock(this.assets.addBallon, false)
		await balloon.fade(1, this.defaultTransitionDurationSeconds)
		await this.app.waitForClick()

		addBallon.fade(0, this.defaultTransitionDurationSeconds)

		await this.showCodeBlock(this.assets.addAnimation, false)
		balloon.paused = false
	}
}
