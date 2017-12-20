
import * as Dwebp from "../dist/dwebp"

async function loadBinaryData(url: string): Promise<Uint8Array> {
	return new Promise<Uint8Array>(function(resolve, reject) {
		var xhr = new XMLHttpRequest()
		xhr.open("GET", url)
		xhr.responseType = "arraybuffer"
		xhr.onerror = function(error) { reject(error) }
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && xhr.status == 200) {
				resolve(new Uint8Array(xhr.response))
			}
		}
		xhr.send()
	})
}

async function detectWebpSupport(): Promise<boolean> {
	const testImageSources = [
		"data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
		"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
	]
	const testImage = (src: string): Promise<boolean> => {
		return new Promise((resolve, reject) => {
			var img = document.createElement("img")
			img.onerror = error => resolve(false)
			img.onload = () => resolve(true)
			img.src = src
		})
	}
	const results = await Promise.all(testImageSources.map(testImage))
	return results.every(result => !!result)
}

const relax = () => new Promise((resolve, reject) =>requestAnimationFrame(resolve))

export default class WebpHero {
	private readonly dwebp
	private busy = false

	constructor({dwebp = new Dwebp()}: {dwebp?: any} = {}) {
		this.dwebp = dwebp
	}

	async decode(webpdata: Uint8Array): Promise<string> {
		if (this.busy) throw new Error("cannot decode when dwebp is already busy")
		this.busy = true

		try {
			await relax()
			const canvas = document.createElement("canvas")
			this.dwebp.setCanvas(canvas)
			this.dwebp.webpToSdl(webpdata, webpdata.length)
			this.busy = false
			return canvas.toDataURL()
		}
		catch (error) {
			this.busy = false
			throw error
		}
	}

	async polyfill({document = window.document, force = false}: {document?: Document, force?: boolean} = {}): Promise<void> {
		if (!force && await detectWebpSupport()) return undefined

		for (const image of Array.from(document.querySelectorAll("img"))) {
			const src = image.src
			if (/.webp$/.test(src)) {
				try {
					const webpdata = await loadBinaryData(src)
					const pngdata = await this.decode(webpdata)
					image.src = pngdata
				} catch (error) {
					console.error(`error decoding webp image "${src}"`, error)
					throw error
				}
			}
		}
	}
}
