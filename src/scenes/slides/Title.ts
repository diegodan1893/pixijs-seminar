import { Sprite, Text } from "pixi.js"
import { Slide } from "./Slide"
import pixijsLogo from "@/assets/title/pixi logo.png"

export class Title extends Slide {
	get assetManifest() {
		return {
			assets: {
				pixijsLogo,
			},
		}
	}

	async transitionIn(): Promise<void> {
		await this.fade(1, this.defaultTransitionDurationSeconds)
		await super.transitionIn()
	}

	protected async init(): Promise<void> {
		const pixijsLogo = new Sprite(this.assets.pixijsLogo)
		pixijsLogo.anchor.set(0.5)
		pixijsLogo.position.set(this.app.halfWidth, this.app.halfHeight - 100)
		this.addChild(pixijsLogo)

		const title = new Text("Gráficos 2D acelerados por hardware", {
			fontFamily: "Roboto",
			fontWeight: "800",
			fontSize: 70,
		})
		title.anchor.set(0.5)
		title.position.set(this.app.halfWidth, this.app.halfHeight + 100)
		this.addChild(title)
	}
}
