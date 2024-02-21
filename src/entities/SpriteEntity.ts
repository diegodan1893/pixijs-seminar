import { Sprite, Texture } from "pixi.js"
import { Entity } from "./Entity"

export class SpriteEntity extends Entity {
	private _sprite: Sprite

	constructor(texture: Texture) {
		super()

		this._sprite = new Sprite(texture)
		this.addChild(this.sprite)
	}

	get sprite() {
		return this._sprite
	}
}
