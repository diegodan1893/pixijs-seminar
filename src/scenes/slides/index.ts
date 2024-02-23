import { App } from "@/app/App"
import { Title } from "./Title"
import { TextSlide } from "./TextSlide"
import { GettingStarted } from "./GettingStarted"
import { Architecture } from "./Architecture"
import { Tree } from "./Tree"
import { SpriteExample } from "./SpriteExample"
import { SpritesheetExample } from "./SpritesheetExample"
import { GraphicsExample } from "./GraphicsExample"
import { MasksExample } from "./MasksExample"
import { ShadersExample } from "./ShadersExample"
import maracena from "@/assets/shaders/maracena.png"
import leaves from "@/assets/shaders/leaves.png"
import dog from "@/assets/shaders/dog.png"
import blue from "@/assets/shaders/blue.png"
import radial from "@/assets/shaders/radial.png"
import swipe from "@/assets/shaders/swipe.png"
import dogMask from "@/assets/shaders/dogMask.png"
import { AnimationsExample } from "./AnimationsExample"

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
		new Tree(app),
		new SpriteExample(app),
		new SpritesheetExample(app),
		new GraphicsExample(app),
		new TextSlide(app, [
			"Texto",
			"Lo que estáis viendo ahora mismo",
			"Puede usar fuentes normales o «bitmap fonts»",
			"Se pueden añadir bordes, sombras, etc.",
			"En el caso de las fuentes normales, usar FontFaceObserver",
		]),
		new MasksExample(app),
		new TextSlide(app, ["Shaders"]),
		new ShadersExample(app, maracena, leaves, swipe),
		new ShadersExample(app, maracena, leaves, radial),
		new ShadersExample(app, dog, blue, dogMask),
		new AnimationsExample(app),
		new TextSlide(app, [
			"Algunas cosas malas",
			"Google Chrome en Android es especial",
			"Bug que solo afecta a Samsung Galaxy S22 y S23, ¿habrá más dispostivos con cosas raras?",
			"Hay que llamar a mano al método destroy() de los Graphics",
			"Los Asset Bundles no se pueden cambiar una vez definidos",
			"Assets.loadBundle no cuenta referencias",
		]),
		new Title(app),
	]
}
