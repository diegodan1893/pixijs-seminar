import { App } from "@/app/App"
import { Title } from "./Title"

export const getSlides = (app: App) => {
	return [new Title(app)]
}
