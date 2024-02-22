import { Point, TextStyle } from "pixi.js"
import { Scene } from "../Scene"
import { TextEntity } from "@/entities/TextEntity"
import { sleep } from "@/util/Time"
import { easeOutCubic } from "@/math/Easing"

export abstract class Slide extends Scene {
	private titlePosition = new Point(100, 150)
	private nextContentLinePosition = new Point(100, 300)
	private contentLineSpacing = 65

	private slideDistance = 100
	private slideDurationSeconds = 0.5
	private slideWaitSeconds = 0.1

	private titleStyle: Partial<TextStyle> = {
		fontFamily: "Roboto",
		fontWeight: "800",
		fontSize: 90,
	}

	private contentStyle: Partial<TextStyle> = {
		fontFamily: "Roboto",
		fontSize: 40,
	}

	async transitionIn() {
		this.visible = true
		this.runAndGoToNext()
	}

	protected async start() {}

	protected addTitle(text: string): Promise<TextEntity> {
		return this.addText(text, this.titleStyle, this.titlePosition)
	}

	protected addContentLine(text: string): Promise<TextEntity> {
		const linePosition = this.nextContentLinePosition.clone()
		this.nextContentLinePosition.y += this.contentLineSpacing

		return this.addText(text, this.contentStyle, linePosition)
	}

	protected async addText(
		text: string,
		style: Partial<TextStyle>,
		position: Point
	): Promise<TextEntity> {
		const line = new TextEntity(text, style)
		line.position.set(position.x + this.slideDistance, position.y)
		line.visible = false
		this.addEntity(line)

		line.fade(1, this.slideDurationSeconds)
		line.move(position.x, line.y, this.slideDurationSeconds, easeOutCubic)
		await sleep(this.slideWaitSeconds)

		return line
	}

	private async runAndGoToNext() {
		await this.start()
		await this.app.waitForClick()
		++this.app.openSlideIndex
	}
}
