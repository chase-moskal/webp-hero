
![webp-hero](webp-hero.jpg)

webp-hero
=========

- [libwebp](https://github.com/webmproject/libwebp/commit/6bcf8769809b17c4bef4d5b48b8095b629b5e4d3) — *6bcf876* — 2019-01-23
- [emscripten](https://github.com/emscripten-core/emscripten) — sdk-1.37.22-64bit

webp image format browser polyfill
----------------------------------

- webp images come alive! in firefox, safari, edge, internet explorer, and chrome

- webp-hero actually runs google's `libwebp` decoder in the browser — it converts webp images to png's on-the-fly

- webp-hero's polyfill function renders decoded image data to a hidden canvas, and converts that to a png data url which is then displayed to the user

- webp-hero's bundle is actually kinda heavy weight at almost 150 KB gzipped, but, it's a trade-off — trading the user's compute resources for bandwidth savings (running the decoder instead of serving up fat images)

how to use web-hero's polyfill on your page
-------------------------------------------

- webp-hero's polyfill function loops over each img tag on the page, and converts
each into a png data url

- currently only works on img tags, not yet on css images (contributions welcome)

### use webp-hero in a simple html page

1. install the webp-hero bundle onto the page

	```html
	<script src="webp-hero.bundle.js"></script>
	```

2. run the webp-hero polyfill function

	```html
	<script>
		const webpHero = new WebpHero()
		webpHero.polyfill()
	</script>
	```

### use webp-hero in a commonjs application

1. install the webp-hero npm package

	`npm install webp-hero`

2. import and run the webp-hero polyfill function

	```js
	import {WebpHero} from "webp-hero"
	const webpHero = new WebpHero()
	webpHero.polyfill()
	```

direct usage of dwebp
---------------------

you can use google's dwebp more directly via `dist/dwebp.js`

- this is compiled from google's `libwebp` emscripten build, and then wrapped in a common-js module
- contains minimal functionality for rendering webp data to a canvas — no polyfilling logic
- available as common-js module via `"webp-hero/dist/dwebp"`
- the typescript declaration file describes the usage signature [dwebp.d.ts](./source/dwebp.d.ts)

development on webp-hero
------------------------

- **prerequisites**
	- git
	- node
	- docker (only if you want to rebuild libwebp)

- **development**
	- `npm install` — install dependencies and run build
		- the npm build wraps up google's libwebp code into the dwebp.js module
		- it also builds the webp-hero typescript module with the polyfill
	- `npm start` — start http server
		- visit http://localhost:8080/ to see the webp-hero demo
		- visit http://localhost:8080/libwebp/dist/ to see google's demo

- **rebuild libwebp**
	- google's libwebp project is built inside of a docker container
	- libwebp build artifacts (in `libwebp/dist`) are checked into git, because it takes so long to build
	- `sudo ./libwebp/build.sh` — run the libwebp build (docker requires sudo)
	- `sudo ./libwebp/build-debug.sh` — useful to drop into the container to have a look around, does not emit build artifacts
