
import {Webp} from "../libwebp/dist/webp"

import {loadBinaryData} from "./load-binary-data"
import {detectWebpSupport} from "./detect-webp-support"
import {WebpHeroOptions, PolyfillDocumentOptions} from "./interfaces"

const relax = () => new Promise(resolve => requestAnimationFrame(resolve))

export class WebpMachine {
	private readonly webp: Webp
	private readonly webpSupport: Promise<boolean>
	private busy = false
	private cache: {[key: string]: string} = {}

	/**
	 * Instance a webp machine
	 */
	constructor({
		webp = new Webp(),
		webpSupport = detectWebpSupport()
	}: WebpHeroOptions = {}) {
		this.webp = webp
		this.webpSupport = webpSupport
	}

	/**
	 * Decode raw webp data into a png data url
	 */
	async decode(webpData: Uint8Array): Promise<string> {
		if (this.busy) throw new Error("can only decode webp-images one-at-a-time")
		this.busy = true

		try {
			await relax()
			const canvas = document.createElement("canvas")
			this.webp.setCanvas(canvas)
			this.webp.webpToSdl(webpData, webpData.length)
			this.busy = false
			return canvas.toDataURL()
		}
		catch (error) {
			this.busy = false
			throw error
		}
	}

	/**
	 * Polyfill the webp format on the given <img> element
	 */
	async polyfillImage(image: HTMLImageElement): Promise<void> {
		if (await this.webpSupport) return
		const {src} = image
		if (/\.webp$/i.test(src)) {
			if (this.cache[src]) {
				image.src = this.cache[src]
			}
			try {
				const webpData = await loadBinaryData(src)
				const pngData = await this.decode(webpData)
				image.src = this.cache[src] = pngData
			}
			catch (error) {
				console.error(`webp-machine failed to polyfill image: "${src}"`, error)
				throw error
			}
		}
	}

	/**
	 * Run the webp format polyfill on the entire web page
	 */
	async polyfillDocument({
		document = window.document
	}: PolyfillDocumentOptions = {}): Promise<void> {
		if (await this.webpSupport) return null
		for (const image of Array.from(document.querySelectorAll("img"))) {
			await this.polyfillImage(image)
		}
	}
}
