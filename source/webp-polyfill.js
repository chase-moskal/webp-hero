
{
	function detectWebpSupport() {

		// lossy, lossless
		const testImageSources = [
			"data:image/webp;base64,UklGRjIAAABXRUJQVlA4ICYAAACyAgCdASoCAAEALmk0mk0iIiIiIgBoSygABc6zbAAA/v56QAAAAA==",
			"data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAQAAAAfQ//73v/+BiOh/AAA="
		]
	
		function testImage(src) {
			return new Promise(function(resolve, reject) {
				var img = document.createElement("img")
				img.onerror = function(error) { resolve(false) }
				img.onload = function() { resolve(true) }
				img.src = src
			})
		}
	
		return Promise.all(testImageSources.map(function(src) {
			return testImage(src)
		})).then(function(results) {
			return results.every(function(result) { return !!result })
		})
	}

	detectWebpSupport().then(function(webpSupported) {
		if (webpSupported) return false

		var images = Array.prototype.slice.call(document.querySelectorAll("img"))
		var start = Date.now()

		images.reduce(function(promise, image) {
			return promise.then(function(){
				var src = image.src
				var isWebp = /.webp$/.test(src)
				if (isWebp) {
					console.log(src)
					return dwebp.render(src)
						.then(function(data) { image.src = data })
						.catch(function(error) { console.error("decoding error", error); throw error; })
				}
			});
		}, Promise.resolve())
			.then(function() {
				var time = Date.now() - start
				console.log("all done", time, "ms")
			})
	})
}
