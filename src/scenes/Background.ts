import { Graphics, Sprite } from "pixi.js"
import { Scene } from "./Scene"
import { App } from "@/app/App"
import celtiberianLogo from "@/assets/background/celtiberian logo.png"

export class Backgorund extends Scene {
	private backgroundGraphics: Graphics
	private logoMargin = 20

	constructor(app: App) {
		super(app)

		this.backgroundGraphics = new Graphics()
		this.backgroundGraphics.beginFill("#ffffff")
		this.backgroundGraphics.drawRect(0, 0, this.app.width, this.app.height)
		this.addChild(this.backgroundGraphics)
	}

	get assetManifest() {
		return {
			assets: {
				celtiberianLogo,
			},
		}
	}

	protected async init(): Promise<void> {
		const celtiberianLogo = new Sprite(this.assets.celtiberianLogo)
		celtiberianLogo.anchor.set(1)
		celtiberianLogo.position.set(
			this.app.width - this.logoMargin,
			this.app.height - this.logoMargin
		)
		this.addChild(celtiberianLogo)
	}

	protected async deinit(): Promise<void> {
		this.backgroundGraphics.destroy()
	}
}
