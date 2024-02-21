import { App } from "@/app/App"
import "@/styles/index.css"

const main = async () => {
	const app = new App({
		canvasElementId: "pixi-canvas",
		width: 1920,
		height: 1080,
	})

	await app.init()
}

main()
