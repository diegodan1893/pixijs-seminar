import { Scene } from "../Scene"

export abstract class Slide extends Scene {
	async transitionIn() {
		this.visible = true
		this.runAndGoToNext()
	}

	protected async start() {}

	private async runAndGoToNext() {
		await this.start()
		await this.app.waitForClick()
		this.app.nextSlide()
	}
}
