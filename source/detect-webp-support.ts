
export async function detectWebpSupport(): Promise<boolean> {

	const testImageSources = [
		"data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
		"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
	]

	const testImage = (src: string): Promise<boolean> => {
		return new Promise(resolve => {
			var img = document.createElement("img")
			img.onerror = () => resolve(false)
			img.onload = () => resolve(true)
			img.src = src
		})
	}

	const results = await Promise.all(testImageSources.map(testImage))

	return results.every(result => !!result)
}
