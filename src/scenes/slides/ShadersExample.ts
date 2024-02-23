import { App } from "@/app/App"
import { Slide } from "./Slide"
import { BLEND_MODES, Container, Filter, Sprite } from "pixi.js"

const fragmentShader = `
varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform highp vec4 inputSize;
uniform highp vec4 outputFrame;

// The mask that will be used for the transition
uniform sampler2D transitionImage;

// A value from 0 to 1 where 0 is the beginning of the transition and 1 the end
uniform float transitionStep;

/**
 * At transitionStep=0:
 *
 *      0 [---------------------] 1   Color of the transition image
 *  1 [---] 0                         Corresponding alpha at that transitionStep
 *  b  len  t                         b=bottom, len=length, t=top
 *
 *
 * At transitionStep=0.5:
 *
 *      0 [-----------|---------] 1
 *                1 [---] 0
 *
 *
 * At transitionStep=1:
 *
 *      0 [---------------------] 1
 *                            1 [---] 0
 */

void main(void)
{
	vec4 pixelColor = texture2D(uSampler, vTextureCoord);

	vec2 transitionImageCoordinates = vTextureCoord * inputSize.xy / outputFrame.zw;
	float transitionImageValue = texture2D(transitionImage, transitionImageCoordinates).r;

	float length = 0.3;
	float top = transitionStep + length * transitionStep;
	float bottom = transitionStep - length * (1.0 - transitionStep);
	float resultAlpha;

	resultAlpha = 1.0 - (transitionImageValue - bottom) / (top - bottom);
	resultAlpha = clamp(resultAlpha, 0.0, 1.0);
	
	gl_FragColor = vec4(pixelColor.rgb, resultAlpha);
}
`

export class ShadersExample extends Slide {
	private lifetimeSeconds: number = 0
	private transitionDurationSeconds: number = 3
	private paused: boolean = true

	private filter?: Filter

	private resultContainer?: Container

	constructor(
		app: App,
		private from: string,
		private to: string,
		private transition: string
	) {
		super(app)
	}

	get assetManifest() {
		return {
			assets: {
				from: this.from,
				to: this.to,
				transition: this.transition,
			},
		}
	}

	async transitionOut(): Promise<void> {
		// Fades cause issues with the shader due to the blend mode
		// TODO: find a solution for this
		if (this.resultContainer) {
			this.resultContainer.visible = false
		}

		await super.transitionOut()
	}

	protected async start(): Promise<void> {
		const sampleContainer = new Container()
		this.addChild(sampleContainer)

		const from = new Sprite(this.assets.from)
		from.position.x = 0
		sampleContainer.addChild(from)

		const to = new Sprite(this.assets.to)
		to.position.x = this.app.width / 3
		sampleContainer.addChild(to)

		const transition = new Sprite(this.assets.transition)
		transition.position.x = (this.app.width / 3) * 2
		sampleContainer.addChild(transition)

		sampleContainer.pivot.x = Math.round(sampleContainer.width / 2)
		sampleContainer.position.set(this.app.halfWidth, 100)

		this.resultContainer = new Container()
		this.resultContainer.position.set(
			this.app.halfWidth,
			this.app.halfHeight + 200
		)
		this.resultContainer.scale.set(2)
		this.addChild(this.resultContainer)

		const resultFrom = new Sprite(this.assets.from)
		resultFrom.anchor.set(0.5)
		this.resultContainer.addChild(resultFrom)

		const resultTo = new Sprite(this.assets.to)
		resultTo.anchor.set(0.5)
		this.resultContainer.addChild(resultTo)

		this.filter = new Filter(undefined, fragmentShader, {
			transitionImage: this.assets.transition,
			transitionStep: 0,
		})
		this.filter.blendMode = BLEND_MODES.NORMAL_NPM

		resultTo.filters = [this.filter]

		await this.app.waitForClick()
		this.paused = false
	}

	protected tick(elapsedSeconds: number): void {
		if (!this.filter || this.paused) {
			return
		}

		this.lifetimeSeconds += elapsedSeconds

		const progress = this.lifetimeSeconds % this.transitionDurationSeconds
		const transitionStep = progress / this.transitionDurationSeconds

		this.filter.uniforms.transitionStep = transitionStep
	}
}
