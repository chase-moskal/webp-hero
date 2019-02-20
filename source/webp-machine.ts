
import {Webp} from "../libwebp/dist/webp"

import {WebpHeroOptions} from "./interfaces"
import {loadBinaryData} from "./load-binary-data"
import {detectWebpSupport} from "./detect-webp-support"

const relax = () => new Promise(resolve => requestAnimationFrame(resolve))

export class WebpMachine {
	private readonly webp: Webp
	private readonly webpSupport: Promise<boolean>
	private busy = false
	private cache: {[key: string]: string} = {}

	constructor({
		webp = new Webp(),
		webpSupport = detectWebpSupport()
	}: WebpHeroOptions = {}) {
		this.webp = webp
		this.webpSupport = webpSupport
	}

	async decode(webpData: Uint8Array): Promise<string> {
		if (this.busy) throw new Error("cannot decode when dwebp is already busy")
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

	async polyfillImage(image: HTMLImageElement): Promise<void> {
		const webpSupport = await this.webpSupport
		const {src} = image
		if (!webpSupport && /\.webp$/i.test(src)) {
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

	async polyfillDocument({document = window.document}: {
		document?: Document
	} = {}): Promise<void> {
		const webpSupport = await this.webpSupport
		if (webpSupport) return null
		for (const image of Array.from(document.querySelectorAll("img"))) {
			await this.polyfillImage(image)
		}
	}
}
