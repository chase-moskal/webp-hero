
# webp-hero changelog

## v0.0.0-dev.29

non-breaking changes:
- add static member canvas helpers to WebpMachine
	- `WebpMachine.replaceImageWithCanvas`
	- `WebpMachine.cloneCanvas`
- improve canvas helper functions, fix scrolling while hovering over canvas
- improve demo page

## v0.0.0-dev.28 — 2022-02-12

non-breaking changes:
- add `useCanvasElements` boolean option to WebpMachine, which causes webp-hero to polyfill by wholly replacing webp image elements with canvas elements

## v0.0.0-dev.27 — 2020-10-21

non-breaking changes:
- fix issue #40 where webp build was requiring node modules like fs

## v0.0.0-dev.26 — 2020-08-26

we finally have a fresh new working build of libwebp. this unblocks webp-hero development

non-breaking changes:
- add webp-machine `clearCache` method so you can manually save memory 8ace812
- rework readme
- merge @theonetheycallneo's base64 support a4cb1f8
- fix input blocking via `doNotCaptureKeyboard` cda1bd6

## v0.0.0-dev.24 — 2019-09-03

non-breaking changes:

- update all dependencies (didn't update libwebp, just webp-hero npm deps)
- remove .npmrc 'save-exact' mode

## v0.0.0-dev.23 — 2019-05-31

non-breaking changes:

- add webp-machine option "detectWebpImage" which takes an HTMLImageElement and
	returns a boolean indicating whether or not the image is webp

	special thanks to @mikunimaru and @Lobasya for contributing issues and pr's on this

## v0.0.0-dev.21 — 2019-04-28

non-breaking changes:
- upgrade to [libwebp 1326988](https://github.com/webmproject/libwebp/commit/1326988d1091202be426aba07d0061b6759862ff) — 2019-04-18
- upgrade to [emscripten 1.38.30](https://github.com/emscripten-core/emscripten/releases/tag/1.38.30) — 2019-03-21
- upgrade to [typescript 3.4.5](https://github.com/Microsoft/TypeScript/releases/tag/v3.4.5)
- add package.json "module" field

## v0.0.0-dev.20 — 2019-04-23

non-breaking changes:
- fix error handling [(thanks @Drummi42 for issue #15)](https://github.com/chase-moskal/webp-hero/issues/15)
- fix webp-machine caching [(thanks @bake for pr #14)](https://github.com/chase-moskal/webp-hero/pull/14)

## v0.0.0-dev.19 — 2019-03-18

introducing proper es-modules, just to be future-proof and cool

however the browserify bundle generated via the commonjs build will be the most compatible with the 'ol ie11

**breaking:**
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

**breaking changes:**
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
