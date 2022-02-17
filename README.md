
🦸‍♂️ webp-hero
============

browser polyfill for the webp image format
------------------------------------------

- 📦 `npm install webp-hero`
- 🎉 webp images come alive, even in safari and ie11! _(firefox and edge now support webp)_
- ⚙️ webp-hero actually runs google's `libwebp` decoder in the browser _(converts webp images to png on-the-fly)_
- 🕹️ live demo
	- [webp-hero/](https://webp-hero.chasemoskal.com/) — webp-hero polyfill operating normally _(does nothing if your browser supports webp)_
	- [webp-hero/?force](https://webp-hero.chasemoskal.com/?force) — webp conversion to png is forced _(even if your browser supports webp)_
	- [webp-hero/?force&useCanvasElements](https://webp-hero.chasemoskal.com/?force&useCanvasElements) — wholly replace webp image elements with canvas elements _(added for icecat compatibility)_
- ♻️ freshness
	- [libwebp def64e9](https://github.com/webmproject/libwebp/tree/def64e920ff69e1d8270a2787d13df7c0d38d8ba) — 2020-08-17
	- [emscripten 2.0.1](https://github.com/emscripten-core/emscripten/releases/tag/2.0.1) — 2020-08-21
- 💯 browser support tested 2020-08-26
	- evergreen browsers (chrome, firefox, edge, desktop safari)
	- windows 7 ie11
	- iphone 7 mobile safari
	- galaxy s5 samsung internet
	- icecat 60.7 *(requires option `{useCanvasElements: true}`)*
- ⚖️ `98 KB`
- ⚠️ known issues and deficiencies
	- doesn't yet support css background images (pull requests welcome!)
	- doesn't yet support `<picture>` elements
	- doesn't yet support web workers (decodes images one-at-a-time, blocking, single-threaded)
	- currently only detects webp images with filename ending in `.webp` extension
	- no wasm (because older browsers)

webp-hero installation and usage
--------------------------------

- **option A — html install, use webp-hero's bundle with the polyfills**  
	you just inject the html onto your page. this technique works nicely for older browsers like ie11

	1. load generic polyfills and the webp-hero global bundle via script tags

		```html
		<script src="https://unpkg.com/webp-hero@0.0.1/dist-cjs/polyfills.js"></script>
		<script src="https://unpkg.com/webp-hero@0.0.1/dist-cjs/webp-hero.bundle.js"></script>
		```

	2. run the webp-hero polyfill function on the document

		```html
		<script>
			var webpMachine = new webpHero.WebpMachine()
			webpMachine.polyfillDocument()
		</script>
		```

- **option B — commonjs install, use webp-hero's cjs modules in your application**  
	you'll be familiar with this if you're bundling a commonjs with browserify or webpack  

	1. install the webp-hero npm package

		`npm install webp-hero`

	2. import and run the webp-hero polyfill function

		```js
		import {WebpMachine} from "webp-hero"
		const webpMachine = new WebpMachine()
		webpMachine.polyfillDocument()
		```

	3. *if* you want to support old browsers like ie11,  
		you might want to include your own polyfills or import `webp-hero/dist-cjs/polyfills.js`

- **option C — es-module install, like in the future**  
	es modules are available. but why would anybody use these for webp-hero? i guess it could be useful for.. mobile safari? anyways, this won't work in older browsers, which might defeat the purpose of using webp-hero in the first place? well.. it's here for you if you need it!

	1. use webp-hero on your page in one script tag

		```html
		<script type="module">
			import {WebpMachine} from "https://unpkg.com/webp-hero@0.0.1/dist/webp-machine.js"
			const webpMachine = new WebpMachine()
			webpMachine.polyfillDocument()
		</script>
		```

- **option D — angular users should look at [ngx-webp-polyfill](https://github.com/turnstileweb/ngx-webp-polyfill)**

webp-hero advanced usage
------------------------

### webp-machine

- [webp-machine.ts](./source/webp-machine.ts) has logic for polyfilling, caching, and enforcing sequential webp decoding
	- `new WebpMachine({...options})` — all options have defaults, but you can override them
		- `{webp}` google module which contains the actual decoder
		- `{webpSupport}` function which detects whether the browser supports webp
		- `{detectWebpImage}` detect whether or not the provided `<img>` element is in webp format
		- `{useCanvasElements: true}` boolean which when true causes webp-hero to polyfill webp images by wholly replacing them with canvas elements (instead of using png data urls). this helps compatibility with icecat (default: false)
	- the webpMachine you create has the following methods
		- `webpMachine.polyfillDocument()` — run over the entire html document, sniffing out webp `<img>` elements to convert (only if the browser doesn't support webp)
		- `webpMachine.polyfillImage(imageElement)` — converts the given webp image (only if the browser doesn't support webp)
		- `webpMachine.decode(webpData)` — decode webp `Uint8Array` data, return a png data-url
		- `webpMachine.clearCache()` — manually wipe the cache to save memory
- other modules like `convert-binary-data.ts` and etc may be unstable, you might not want to rely on those

### manual-style with the google libwebp decoder

- we compile from google's libwebp emscripten build in a docker container
- this build contains minimal functionality for rendering webp data to a canvas:
	- google's emscripten output: `webp-hero/libwebp/google/webp.js`
- we do little hacks to wrap this build into two modules:
	- common-js: `webp-hero/libwebp/webp.cjs.js`
	- es-module: `webp-hero/libwebp/webp.js`
- we have a typescript declaration for it too: [webp.d.ts](./libwebp/source/webp.d.ts)

webp-hero dev and contributing
------------------------------

- **prerequisites**
	- git and node
	- docker (only if you want to rebuild google's libwebp)

- **webp-hero development**
	- `npm install` — install dependencies and run build
		- runs a typescript build, uses browserify to make the bundle
		- generates `webp-hero/dist/` and `webp-hero/dist-cjs/`
		- generates the polyfills (cjs-only)
		- does *not* rebuild google's libwebp
	- `npm start` — start http server
		- visit http://localhost:5000/ to see the webp-hero demo
		- visit http://localhost:5000/libwebp/dist/google/ to see google's demo

- **rebuild google's libwebp**
	- libwebp build artifacts in `libwebp/dist` are checked into git, because it takes so damn long to build
	- `libwebp/build` — run dockerized libwebp build, regenerates `libwebp/dist`
	- `libwebp/debug` — handy for debugging the dockerized build
