
# webp-hero changelog

## v0.0.0-dev.19 — 2019-03-18

introducing proper es-modules, just to be future-proof and cool

however the browserify bundle generated via the commonjs build will be the most compatible with the 'ol ie11

breaking:
- `dist/` now contains a new es-module build
- `dist-cjs/` now contains the old commonjs equivalent
- update package.json `main` field to point at `dist-cjs`, also typings updated
- move `dist/webp-hero.bundle.js` into `dist-cjs/`
- move `dist/polyfills.js` into `dist-cjs/`

non-breaking:
- update readme with es-module usage example
- add `esm.html` demo page example using es-modules instead of bundle

## v0.0.0-dev.18 — 2019-02-26

non-breaking changes:
- added support for ie11 via optional `dist/polyfills.js`
- update readme examples to support ie11

## v0.0.0-dev.17 — 2019-02-25

breaking changes:
- fix interface name from `WebpHeroOptions` to `WebpMachineOptions`

other changes:
- update readme and packages
- optimize `webp-herp.bundle.js` via tinyify
- improve error handling by not logging anything to console

## v0.0.0-dev.15 — 2019-02-19

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
- rename `dwebp` to just `webp`
- replace all default exports with named exports
- replace `WebpHero` class with `WebpMachine`
- `WebpMachine` class method `polyfill` renamed to `polyfillDocument`
- `WebpMachine` class method `polyfillImage` can polyfill a single img element
- functions `detectWebpSupport` and `loadBinaryData` now available
- update `libwebp` source to latest version
- `libwebp/dist/webp.js` commonjs module is now built inside the docker container

## v0.0.0-dev.12 — 2018-08-10
