import { App } from "@/app/App"
import { Title } from "./Title"
import { TextSlide } from "./TextSlide"
import { GettingStarted } from "./GettingStarted"
import { Architecture } from "./Architecture"

export const getSlides = (app: App) => {
	return [
		new Title(app),
		new TextSlide(app, [
			"¿Qué es PixiJS?",
			"Una librería para hacer gráficos 2D en web",
			"Simplifica el uso de <canvas> con WebGL",
			"Tiene API para cargar recursos y gestionar la interacción del usuario",
			"Shaders",
			"Usos: juegos, visualización de datos, animaciones complejas, estas diapositivas...",
		]),
		new TextSlide(app, [
			"¿Qué no es PixiJS?",
			"Un motor gráfico → Phaser",
			"Un renderer 3D → Three.js ",
			"Una librería para hacer interfaces de usuario",
			"Un entorno de desarrollo, se necesitan herramientas externas para crear assets",
		]),
		new TextSlide(app, [
			"Un paradigma diferente",
			"La pantalla se dibuja varias veces por segundo",
			"Cada fotograma, se actualiza y se pinta todo",
			"Idealmente, los FPS coinciden con los Hz de la pantalla",
		]),
		new GettingStarted(app),
		new Architecture(app),
	]
}
