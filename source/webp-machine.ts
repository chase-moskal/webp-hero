import {Webp} from "../libwebp/dist/webp.js"
import {loadBinaryData} from "./load-binary-data.js"
import {detectWebpSupport} from "./detect-webp-support.js"
import {WebpMachineOptions, PolyfillDocumentOptions, DetectWebpImage} from "./interfaces.js"
import {convertDataURIToBinary, isBase64Url} from "./convert-binary-data.js"

const relax = () => new Promise(resolve => requestAnimationFrame(resolve))

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
	private cache: {[key: string]: string} = {}

	constructor({
		webp = new Webp(),
		webpSupport = detectWebpSupport(),
		detectWebpImage = defaultDetectWebpImage
	}: WebpMachineOptions = {}) {
		this.webp = webp
		this.webpSupport = webpSupport
		this.detectWebpImage = detectWebpImage
	}

	/**
	 * Decode raw webp data into a png data url
	 */
	async decode(webpData: Uint8Array): Promise<string> {
		if (this.busy) throw new WebpMachineError("cannot decode when already busy")
		this.busy = true

		try {
			await relax()
			const canvas = document.createElement("canvas")
			this.webp.setCanvas(canvas)
			this.webp.webpToSdl(webpData, webpData.length)
			this.busy = false
			return canvas.toDataURL()
		} catch (error) {
			this.busy = false
			error.name = WebpMachineError.name
			error.message = `failed to decode webp image: ${error.message}`
			throw error
		}
	}

	/**
	 * Polyfill the webp format on the given <img> element
	 */
	async polyfillImage(image: HTMLImageElement): Promise<void> {
		if (await this.webpSupport) return
		const {src} = image
		if (this.detectWebpImage(image)) {
			if (this.cache[src]) {
				image.src = this.cache[src]
				return
			}
			try {
				const webpData = isBase64Url(src)
					? convertDataURIToBinary(src)
					: await loadBinaryData(src)
				const pngData = await this.decode(webpData)
				image.src = this.cache[src] = pngData
			} catch (error) {
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
			} catch (error) {
				error.name = WebpMachineError.name
				error.message = `webp image polyfill failed for url "${image.src}": ${error}`
				throw error
			}
		}
	}
}
