import { Container, ICanvas, Application as PixiApp, Texture } from "pixi.js"
import { Scene } from "@/scenes/Scene"
import { AssetManager } from "./AssetManager"
import { Backgorund } from "@/scenes/Background"
import { Throbber } from "@/scenes/Throbber"
import { Slide } from "@/scenes/slides/Slide"
import { getSlides } from "@/scenes/slides"
import { loadFont } from "@/util/Fonts"
import { clamp } from "@/math/Operations"

interface ApplicationOptions {
	canvasElementId: string
	width: number
	height: number
}

export class App {
	private pixiApp: PixiApp
	private canvas: HTMLElement

	private persistentScenes
	private slides: Slide[]
	private _openSlideIndex: number = 0

	private transientSceneStage: Container
	private currentScene?: Scene
	private nextScene?: Scene

	private _assetManager: AssetManager

	private initialized: boolean = false

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

		this.slides = getSlides(this)

		this.transientSceneStage = new Container()

		this.pixiApp.stage.eventMode = "static"
		this.pixiApp.stage.addChild(this.persistentScenes.background)
		this.pixiApp.stage.addChild(this.transientSceneStage)
		this.pixiApp.stage.addChild(this.persistentScenes.throbber)

		this._assetManager = new AssetManager()

		let urlSlideIndex = location.hash
		if (urlSlideIndex) {
			urlSlideIndex = urlSlideIndex.substring(1)
		}
		this.openSlideIndex = parseInt(urlSlideIndex) || 0

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

	get openSlideIndex(): number {
		return this._openSlideIndex
	}

	set openSlideIndex(index: number) {
		index = clamp(index, 0, this.slides.length - 1)

		if (index === this.openSlideIndex) {
			return
		}

		location.hash = index.toString()
		this._openSlideIndex = index

		if (this.initialized) {
			this.travelTo(index)
		}
	}

	async init() {
		await this.persistentScenes.throbber.load()
		this.persistentScenes.throbber.transitionIn()

		await this.persistentScenes.background.load()
		this.persistentScenes.background.transitionIn()

		await Promise.all([loadFont("Roboto"), loadFont("Inconsolata")])

		this.initialized = true
		this.travelTo(this.openSlideIndex)
	}

	async travelTo(slideIndex: number) {
		const scene = this.slides[slideIndex]
		this.nextScene = scene

		if (this.currentScene) {
			await this.currentScene.transitionOut()
		}

		this.persistentScenes.throbber.transitionIn()

		this.transientSceneStage.addChild(this.nextScene)
		await this.nextScene.load()

		await this.persistentScenes.throbber.transitionOut()

		await this.nextScene.transitionIn()

		if (this.currentScene) {
			await this.currentScene.unload()
			this.transientSceneStage.removeChild(this.currentScene)
		}

		this.currentScene = this.nextScene
		this.nextScene = undefined
	}

	waitForClick(): Promise<void> {
		return new Promise((resolve) => {
			const handleClick = () => {
				this.pixiApp.stage.off("pointertap")

				resolve()
			}

			this.pixiApp.stage.on("pointertap", handleClick)
		})
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
