import { ITextStyle, Text } from "pixi.js"
import { Entity } from "./Entity"

export class TextEntity extends Entity {
	private _text: Text

	constructor(text: string, style: Partial<ITextStyle>) {
		super()

		this._text = new Text(text, style)
		this.addChild(this.text)
	}

	get text(): Text {
		return this._text
	}
}
