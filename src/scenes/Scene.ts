import { Assets, Container, DisplayObject } from "pixi.js"
import { Entity } from "@/entities/Entity"
import { App } from "@/app/App"

export interface SceneAssets {
	assets: Record<string, string>
}

export abstract class Scene extends Entity {
	protected defaultTransitionDurationSeconds: number = 0.3

	protected assets: Awaited<ReturnType<typeof Assets.loadBundle>> = {}
	protected entities: Set<Entity>

	constructor(protected app: App) {
		super()

		this.visible = false
		this.entities = new Set()
	}

	abstract get assetManifest(): SceneAssets

	async load() {
		this.assets = await this.app.assetManager.loadBundle(
			this.assetManifest.assets
		)

		await this.init()
	}

	async unload() {
		await this.deinit()

		this.removeChildren()
		await this.app.assetManager.unloadBundle(this.assetManifest.assets)
	}

	removeChildren(beginIndex?: number, endIndex?: number): DisplayObject[] {
		this.entities.forEach((entity) => entity.destroy())
		this.entities.clear()

		return super.removeChildren(beginIndex, endIndex)
	}

	async transitionIn() {
		await this.fade(1, this.defaultTransitionDurationSeconds)
	}

	async transitionOut() {
		await this.fade(0, this.defaultTransitionDurationSeconds)
	}

	update(elapsedSeconds: number) {
		super.update(elapsedSeconds)

		this.entities.forEach((entity) => entity.update(elapsedSeconds))
	}

	/**
	 * Called after loading, before transitioning in.
	 */
	protected async init() {}

	/**
	 * Called just before unloading, after transitioning out.
	 */
	protected async deinit() {}

	protected addEntity(entity: Entity, parent: Container = this) {
		this.entities.add(entity)
		parent.addChild(entity)
	}

	protected removeEntity(entity: Entity) {
		this.entities.delete(entity)
		this.removeChild(entity)

		entity.destroy()
	}
}
