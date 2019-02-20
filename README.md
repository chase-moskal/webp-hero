
![webp-hero](webp-hero.jpg)

webp-hero
=========

- [libwebp](https://github.com/webmproject/libwebp/commit/d9a662e1aad3e23a6c370e6691366f2d077d697c) — *d9a662e* — 2019-02-18
- [emscripten](https://github.com/emscripten-core/emscripten) — sdk-1.37.22-64bit

webp image format browser polyfill
----------------------------------

- webp images come alive! in firefox, safari, edge, internet explorer, and chrome

- webp-hero actually runs google's `libwebp` decoder in the browser — it converts webp images to png's on-the-fly

- webp-hero's polyfill function renders decoded image data to a hidden canvas, and converts that to a png data url which is then displayed to the user

- webp-hero's bundle is actually kinda heavy weight at almost 150 KB gzipped, but, it's a trade-off — trading the user's compute resources for bandwidth savings (running the decoder instead of serving up fat images)

how to use web-hero's polyfill on your page
-------------------------------------------

- webp-hero contains a class called `WebpMachine` which has a `polyfillDocument` function which converts webp images into png's

- currently only works on img tags, not yet on css images (contributions welcome)

### use webp-hero in a simple html page

1. install the webp-hero bundle onto the page

	```html
	<script src="webp-hero.bundle.js"></script>
	```

2. run the webp-hero polyfill function

	```html
	<script>
		const {WebpMachine} = webpHero
		const webpMachine = new WebpMachine()
		webpMachine.polyfillDocument()
	</script>
	```

### use webp-hero in a commonjs application

1. install the webp-hero npm package

	`npm install webp-hero`

2. import and run the webp-hero polyfill function

	```js
	import {WebpMachine} from "webp-hero"
	const webpMachine = new WebpMachine()
	webpMachine.polyfillDocument()
	```

### advanced usage

the webp-machine class also has a `polyfillImage` and also a `decode` function if you want more fine-grained control (see [webp-machine.ts](./source/webp-machine.ts) source for more info)

direct usage of webp commonjs module
------------------------------------

the webp-machine has polyfilling and caching logic, but you can use google's webp functionality more directly via `webp-hero/libwebp/dist/webp.js`
- this is compiled from google's `libwebp` emscripten build, and then wrapped in a common-js module
- contains minimal functionality for rendering webp data to a canvas
- the typescript declaration file describes the usage signature [webp.d.ts](./libwebp/source/webp.d.ts)

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
		- visit http://localhost:8080/libwebp/dist/google/ to see google's demo

- **rebuild libwebp**
	- google's libwebp project is built inside of a docker container
	- libwebp build artifacts (in `libwebp/dist`) are checked into git, because it takes so long to build
	- `sudo ./libwebp/build` — run the libwebp build (docker requires sudo)
	- `sudo ./libwebp/debug` — useful to drop into the container to have a look around, does not any emit build artifacts
