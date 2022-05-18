declare const webpHero;

/**
 * Check if WebP is supported by the current browser.
 */
 export function isWebpSupported(callback) {
	var img = new Image();
	img.onload = function () {
		var result = (img.width > 0) && (img.height > 0);
		callback(result);
	};
	img.onerror = function () {
		callback(false) ;
	};
	img.src = "data:image/webp;base64,UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA"; // Lossy WebP image.
}

(function() {
	isWebpSupported(function(support) {
		if (! support) {
			var js = document.createElement('script');
			js.src = 'https://unpkg.com/webp-hero@0.0.2/dist-cjs/polyfills.js';
			document.body.appendChild(js)
			js.addEventListener('load', function() {
				var js2 = document.createElement('script');
				js2.src = 'https://unpkg.com/webp-hero@0.0.2/dist-cjs/webp-hero.bundle.js';
				document.body.appendChild(js2);
				js2.addEventListener('load', function() {
					var webpMachine = new webpHero.WebpMachine();
					webpMachine.polyfillDocument();
				});
			});
		}
	});
})();
