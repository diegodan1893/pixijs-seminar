import { Slide } from "./Slide"
import { SpriteEntity } from "@/entities/SpriteEntity"
import { AnimatedSprite, Spritesheet } from "pixi.js"
import { Entity } from "@/entities/Entity"
import doorImage from "@/assets/spritesheet/door.png"
import doorMetadata from "@/assets/spritesheet/door.json"

export class SpritesheetExample extends Slide {
	get assetManifest() {
		return { assets: { doorImage } }
	}

	protected async start(): Promise<void> {
		await this.addTitle("Spritesheets")

		const door = new SpriteEntity(this.assets.doorImage)
		door.sprite.anchor.y = 1
		door.position.set(100, this.app.height - 30)
		door.scale.set(0.5)
		door.visible = false
		this.addEntity(door)

		await door.fade(1, this.defaultTransitionDurationSeconds)

		const doorSpritesheet = new Spritesheet(
			this.assets.doorImage,
			doorMetadata
		)
		await doorSpritesheet.parse()

		const animatedDoor = new Entity()
		animatedDoor.visible = false
		this.addEntity(animatedDoor)

		const animatedDoorSprite = new AnimatedSprite(
			doorSpritesheet.animations.door
		)
		animatedDoorSprite.anchor.set(0.5)
		animatedDoorSprite.position.set(
			this.app.width - 400,
			this.app.halfHeight
		)
		animatedDoorSprite.animationSpeed = 1 / 4
		animatedDoorSprite.play()
		animatedDoor.addChild(animatedDoorSprite)

		await animatedDoor.fade(1, this.defaultTransitionDurationSeconds)
	}
}
