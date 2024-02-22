import { App } from "@/app/App"
import { Slide } from "./Slide"
import { TextEntity } from "@/entities/TextEntity"
import { Point, TextStyle } from "pixi.js"
import { easeOutCubic } from "@/math/Easing"
import { sleep } from "@/util/Time"

export class TextSlide extends Slide {
	private titlePosition = new Point(100, 150)
	private contentPosition = new Point(100, 300)
	private lineSpacing = 10

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

		await this.addText(titleText, this.titleStyle, this.titlePosition)

		let lineY = this.contentPosition.y
		for (const lineText of contentText) {
			const line = await this.addText(
				lineText,
				this.contentStyle,
				new Point(this.contentPosition.x, lineY)
			)

			lineY += line.height + this.lineSpacing
		}
	}

	private async addText(
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
}
