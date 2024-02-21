import FontFaceObserver from "fontfaceobserver"

export const loadFont = async (fontFamily: string): Promise<void> => {
	const font = new FontFaceObserver(fontFamily)
	await font.load(null, 60000)
}
