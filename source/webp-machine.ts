
import {Webp} from "../libwebp/dist/webp.js"
import {loadBinaryData} from "./load-binary-data.js"
import {detectWebpSupport} from "./detect-webp-support.js"
import {convertDataURIToBinary, isBase64Url} from "./convert-binary-data.js"
import {WebpMachineOptions, PolyfillDocumentOptions, DetectWebpImage} from "./interfaces.js"

const relax = () => new Promise(resolve => setTimeout(resolve, 0))

export class WebpMachineError extends Error {}

export const defaultDetectWebpImage: DetectWebpImage = (image: HTMLImageElement) =>
	/\.webp.*$/i.test(image.src)

/**
 * Webp Machine
 * - decode and polyfill webp images
 * - can only decode images one-at-a-time (otherwise will throw busy error)
 */
export class WebpMachine {
	private readonly webp: Webp
	private readonly webpSupport: Promise<boolean>
	private readonly detectWebpImage: DetectWebpImage
	private busy = false
	private cache: {[key: string]: string | HTMLCanvasElement} = {}
	private useCanvasElements = false

	constructor({
		webp = new Webp(),
		webpSupport = detectWebpSupport(),
		useCanvasElements = false,
		detectWebpImage = defaultDetectWebpImage,
	}: WebpMachineOptions = {}) {
		this.webp = webp
		this.webpSupport = webpSupport
		this.useCanvasElements = useCanvasElements
		this.detectWebpImage = detectWebpImage
	}

	/**
	 * Replace an <img> element with a <canvas> element
	 */
	 static replaceImageWithCanvas(image: HTMLImageElement, canvas: HTMLCanvasElement) {
		canvas.className = image.className
		canvas.style.display = image.style.display
		canvas.style.width = image.style.width
		canvas.style.height = image.style.height
		canvas.style.pointerEvents = "none"
		const parent = image.parentElement
		parent.replaceChild(canvas, image)
	}

	/**
	 * Make a copy of a canvas element (useful for caching)
	 */
	static cloneCanvas(oldCanvas: HTMLCanvasElement) {
		const newCanvas = document.createElement("canvas")
		newCanvas.className = oldCanvas.className
		newCanvas.width = oldCanvas.width
		newCanvas.height = oldCanvas.height
		newCanvas.style.display = oldCanvas.style.display
		newCanvas.style.width = oldCanvas.style.width
		newCanvas.style.height = oldCanvas.style.height
		newCanvas.style.pointerEvents = oldCanvas.style.pointerEvents
		const context = newCanvas.getContext("2d")
		context.drawImage(oldCanvas, 0, 0)
		return newCanvas
	}

	/**
	 * Paint a webp image onto a canvas element
	 */
	async decodeToCanvas(canvas: HTMLCanvasElement, webpData: Uint8Array) {
		if (this.busy)
			throw new WebpMachineError("cannot decode when already busy")

		this.busy = true

		try {
			await relax()
			this.webp.setCanvas(canvas)
			this.webp.webpToSdl(webpData, webpData.length)
		}
		catch (error) {
			error.name = WebpMachineError.name
			error.message = `failed to decode webp image: ${error.message}`
			throw error
		}
		finally {
			this.busy = false
		}
	}

	/**
	 * Decode raw webp data into a png data url
	 */
	async decode(webpData: Uint8Array): Promise<string> {
		const canvas = document.createElement("canvas")
		await this.decodeToCanvas(canvas, webpData)
		return canvas.toDataURL()
	}

	/**
	 * Polyfill the webp format on the given <img> element
	 */
	async polyfillImage(image: HTMLImageElement): Promise<void> {
		if (await this.webpSupport) return
		const {src} = image
		if (this.detectWebpImage(image)) {
			if (this.cache[src]) {
				if (this.useCanvasElements) {
					const canvas = WebpMachine.cloneCanvas(<HTMLCanvasElement>this.cache[src])
					WebpMachine.replaceImageWithCanvas(image, canvas)
				}
				else
					image.src = <string>this.cache[src]
				return
			}
			try {
				const webpData = isBase64Url(src)
					? convertDataURIToBinary(src)
					: await loadBinaryData(src)
				if (this.useCanvasElements) {
					const canvas = document.createElement("canvas")
					await this.decodeToCanvas(canvas, webpData)
					WebpMachine.replaceImageWithCanvas(image, canvas)
					this.cache[src] = canvas
				}
				else {
					const pngData = await this.decode(webpData)
					image.src = this.cache[src] = pngData
				}
			}
			catch (error) {
				error.name = WebpMachineError.name
				error.message = `failed to polyfill image "${src}": ${error.message}`
				throw error
			}
		}
	}

	/**
	 * Polyfill webp format on the entire web page
	 */
	async polyfillDocument({
		document = window.document
	}: PolyfillDocumentOptions = {}): Promise<void> {
		if (await this.webpSupport) return null
		for (const image of Array.from(document.querySelectorAll("img"))) {
			try {
				await this.polyfillImage(image)
			}
			catch (error) {
				error.name = WebpMachineError.name
				error.message = `webp image polyfill failed for url "${image.src}": ${error}`
				throw error
			}
		}
	}

	/**
	 * Manually wipe the cache to save memory
	 */
	clearCache() {
		this.cache = {}
	}
}
