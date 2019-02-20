
# webp-hero changelog

### v0.0.0-dev.15 — 2019-02-19

- rename `dist/webp-hero.polyfill.bundle.js` to `dist/webp-hero.bundle.js` and require you to interact with it to activate the polyfill
	```html
	<!-- replace this: -->
	<script src="webp-hero/dist/webp-hero.polyfill.bundle.js"></script>

	<!-- with this: -->
	<script src="webp-hero/dist/webp-hero.bundle.js"></script>
	<script>
		const {WebpMachine} = webpHero
		const webpMachine = new WebpMachine()
		webpMachine.polyfillDocument()
	</script>
	```
- replace all default exports with named exports
- replace `WebpHero` class with `WebpMachine`
- `WebpMachine` class method `polyfill` renamed to `polyfillDocument`
- `WebpMachine` class method `polyfillImage` can polyfill a single img element
- functions `detectWebpSupport` and `loadBinaryData` now available
- update `libwebp` source to latest version
- `libwebp/dist/webp.js` commonjs module is now built inside the docker container

### v0.0.0-dev.12 — 2018-08-10
