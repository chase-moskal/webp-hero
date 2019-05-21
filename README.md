
![webp-hero](webp-hero.jpg)

webp-hero
=========

browser polyfill for the webp image format
------------------------------------------

- webp images come alive, even in safari and ie11! (firefox and edge now support webp)
- webp-hero actually runs google's `libwebp` decoder in the browser — it converts webp images to png's on-the-fly
- webp-hero's polyfill functionality renders decoded image data to a hidden canvas, and converts that to a png data url which is then displayed to the user

### live demo

- [webp-hero/](https://chasemoskal.com/webp-hero/?force) — webp-hero polyfill operating normally (does nothing if your browser supports webp)
- [webp-hero/?force](https://chasemoskal.com/webp-hero/?force) — webp conversion to png is forced (even if your browser supports webp)

### freshness

- [libwebp 1326988](https://github.com/webmproject/libwebp/commit/1326988d1091202be426aba07d0061b6759862ff) — 2019-04-18
- [emscripten 1.38.30](https://github.com/emscripten-core/emscripten/releases/tag/1.38.30) — 2019-03-21

how to use webp-hero's polyfill on your page
--------------------------------------------

- webp-hero contains a class called `WebpMachine` which has a `polyfillDocument` method which converts webp images into png's
- currently, the polyfill only works on img tags (not yet on css images)
- es modules in `dist/`, and common-js modules in `dist-cjs/`
- `dist-cjs/polyfills.js` is a collection of polyfills that restores ie11 support
- `dist-cjs/webp-hero.bundle.js` is a bundle that writes `webpHero` as a global

### use webp-hero's bundle with the polyfills

this technique works nicely for older browsers

include the bundle via a script tag, and it will install `webpHero` onto
the global `window` object for you to use

1. load the polyfills and the webp-hero bundle globally via script tags

	```html
	<script src="https://unpkg.com/webp-hero@0.0.0-dev.21/dist-cjs/polyfills.js"></script>
	<script src="https://unpkg.com/webp-hero@0.0.0-dev.21/dist-cjs/webp-hero.bundle.js"></script>
	```

2. run the webp-hero polyfill function on the document

	```html
	<script>
		var webpMachine = new webpHero.WebpMachine()
		webpMachine.polyfillDocument()
	</script>
	```

### use webp-hero's commonjs modules in your application

you'll be familiar with this technique if you're producing your own application
bundles via browserify or webpack

if you want to support ie11, you might want to include your own polyfills or use `webp-hero/dist-cjs/polyfills.js`

1. install the webp-hero npm package

	`npm install webp-hero`

2. import and run the webp-hero polyfill function

	```js
	import {WebpMachine} from "webp-hero"
	const webpMachine = new WebpMachine()
	webpMachine.polyfillDocument()
	```

### use webp-hero's native es-modules, like in the future

if you're from the future, you'll probably want to use proper modules, either natively in the browser, or perhaps with optimization via rollup or what-have-you

this won't work in older browsers, which might even partly defeat the purpose of using webp-hero

1. use webp-hero on your page in one script tag

	```html
	<script type="module">
		import {WebpMachine} from "https://unpkg.com/webp-hero@0.0.0-dev.21/dist/webp-machine.js"
		const webpMachine = new WebpMachine()
		webpMachine.polyfillDocument()
	</script>
	```

### advanced usage

- the webp-machine class also has a `polyfillImage` and also a `decode` method if you want more fine-grained control (see [webp-machine.ts](./source/webp-machine.ts) source for more info)

direct usage of webp module
---------------------------

- the webp-machine has polyfilling and caching logic, but you can use google's webp functionality more directly via `webp-hero/libwebp/dist/webp.js`
	- this is compiled from google's `libwebp` emscripten build inside a docker container
	- it is then wrapped in an es-module (`webp.js`) and also a common-js module (`webp.cjs.js`)
	- it contains minimal functionality for rendering webp data to a canvas
	- the typescript declaration file describes the usage signature: [webp.d.ts](./libwebp/source/webp.d.ts)

development on webp-hero
------------------------

- **prerequisites**
	- git
	- node
	- docker (only if you want to rebuild libwebp)

- **development**
	- `npm install` — install dependencies and run build
		- run typescript build
		- generates `webp-hero/dist/` and `webp-hero/dist-cjs/`
	- `npm start` — start http server
		- visit http://localhost:8080/ to see the webp-hero demo
		- visit http://localhost:8080/libwebp/dist/google/ to see google's demo

- **rebuild libwebp**
	- google's libwebp project is built inside of a docker container
	- libwebp build artifacts (in `libwebp/dist`) are checked into git, because it takes so long to build
	- `sudo ./libwebp/build` — run the libwebp build (docker requires sudo)
	- `sudo ./libwebp/debug` — useful to drop into the container to have a look around, does not any emit build artifacts'
