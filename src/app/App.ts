import { Container, ICanvas, Application as PixiApp, Texture } from "pixi.js"
import { Scene } from "@/scenes/Scene"
import { AssetManager } from "./AssetManager"
import { Backgorund } from "@/scenes/Background"
import { Throbber } from "@/scenes/Throbber"

interface ApplicationOptions {
	canvasElementId: string
	width: number
	height: number
}

export class App {
	private pixiApp: PixiApp
	private canvas: HTMLElement

	private persistentScenes

	private transientSceneStage: Container
	private currentScene?: Scene
	private nextScene?: Scene

	private _assetManager: AssetManager

	constructor(private options: ApplicationOptions) {
		const element = document.getElementById(options.canvasElementId)

		if (!element) {
			throw new Error("Pixi canvas not found")
		}

		this.canvas = element

		this.pixiApp = new PixiApp<HTMLCanvasElement>({
			view: element as HTMLCanvasElement,
			width: this.width,
			height: this.height,
			antialias: true,
		})

		window.addEventListener("resize", this.handleWindowResize.bind(this))
		this.handleWindowResize()

		this.pixiApp.ticker.add(() => this.update())

		this.persistentScenes = {
			background: new Backgorund(this),
			throbber: new Throbber(this),
		}

		this.transientSceneStage = new Container()
		this.pixiApp.stage.addChild(this.transientSceneStage)

		Object.values(this.persistentScenes).forEach((scene) =>
			this.pixiApp.stage.addChild(scene)
		)

		this._assetManager = new AssetManager()

		// HACK: doing this magically fixes a rendering issue on Samsung
		// smartphones using Google Chrome. More info:
		// https://github.com/pixijs/pixijs/issues/8315#issuecomment-1125973518
		const ctx = (
			Texture.WHITE.baseTexture.resource.source as ICanvas
		).getContext("2d")
		if (ctx) {
			ctx.fillRect(0, 0, 1, 1)
		}
	}

	get width() {
		return this.options.width
	}

	get height() {
		return this.options.height
	}

	get halfWidth() {
		return Math.round(this.width / 2)
	}

	get halfHeight() {
		return Math.round(this.height / 2)
	}

	get assetManager() {
		return this._assetManager
	}

	async init() {
		await this.persistentScenes.throbber.load()
		this.persistentScenes.throbber.transitionIn()

		await this.persistentScenes.background.load()
		this.persistentScenes.background.transitionIn()
	}

	private update() {
		const elapsedSeconds = this.pixiApp.ticker.deltaMS / 1000

		Object.values(this.persistentScenes).forEach((scene) => {
			if (scene.visible) {
				scene.update(elapsedSeconds)
			}
		})

		if (this.currentScene) {
			this.currentScene.update(elapsedSeconds)
		}

		if (this.nextScene) {
			this.nextScene.update(elapsedSeconds)
		}
	}

	private handleWindowResize() {
		const scale = Math.min(
			document.documentElement.clientWidth / this.width,
			document.documentElement.clientHeight / this.height
		)

		const scaledWidth = this.width * scale
		const scaledHeight = this.height * scale

		const marginLeft =
			document.documentElement.clientWidth / 2 - scaledWidth / 2
		const marginTop =
			document.documentElement.clientHeight / 2 - scaledHeight / 2

		this.canvas.style.width = `${Math.floor(scaledWidth)}px`
		this.canvas.style.height = `${Math.floor(scaledHeight)}px`
		this.canvas.style.marginLeft = `${Math.floor(marginLeft)}px`
		this.canvas.style.marginTop = `${Math.floor(marginTop)}px`
	}
}
