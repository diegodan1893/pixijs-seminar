import { App } from "@/app/App"
import { Slide } from "./Slide"

export class TextSlide extends Slide {
	constructor(app: App, private text: [string, ...string[]]) {
		super(app)
	}

	get assetManifest() {
		return {
			assets: {},
		}
	}

	protected async start(): Promise<void> {
		const [titleText, ...contentText] = this.text

		await this.addTitle(titleText)

		for (const lineText of contentText) {
			await this.addContentLine(lineText)
		}
	}
}
