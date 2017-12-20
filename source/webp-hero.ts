
import dwebp from "../dist/dwebp"

export async function detectWebpSupport(): Promise<boolean> {
	// lossy, lossless
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

export default async function webpHero({images}: {images: HTMLImageElement[]}): Promise<void> {
	const webpSupported = await detectWebpSupport()
	if (webpSupported) return undefined

	for (const image of images) {
		var src = image.src
		var isWebp = /.webp$/.test(src)
		if (isWebp) await dwebp.render(src)
			.then(function(data) { image.src = data; return undefined; })
			.catch(function(error) { console.error("decoding error", error); throw error; })
	}
}
