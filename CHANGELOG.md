
# webp-hero changelog

### v0.0.0-dev.13 — 2019-02-18

- remove default export in favor of named export `WebpHero`

	```js
	// replace this:
	import WebpHero from "webp-hero"

	// with this:
	import {WebpHero} from "webp-hero"
	```

- replace the polyfill bundle with a generic global bundle  

	```html
	<!-- replace this: -->
	<script src="webp-hero/dist/webp-hero.polyfill.bundle.js"></script>

	<!-- with this: -->
	<script src="webp-hero/dist/webp-hero.bundle.js"></script>
	<script>
		const webpHero = new WebpHero()
		webpHero.polyfill()
	</script>
	```

### v0.0.0-dev.12 — 2018-08-10
