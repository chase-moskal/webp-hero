
<br/>

🦸‍♂️ webp-hero
============

<br/>

browser polyfill for the webp image format
------------------------------------------

🕹️ **live demo [webp-hero.chasemoskal.com](https://webp-hero.chasemoskal.com/)**  
🖼️ webp images come alive, even in old browsers  
⚙️ webp-hero runs google's decoder in the browser  
💖 made with open source love, just for you  
📦 `npm install webp-hero`  

<br/>

### 💯 browser support (tested 2020-08-26)
- evergreen browsers (chrome, firefox, edge, desktop safari)
- windows 7 ie11
- iphone 7 mobile safari
- galaxy s5 samsung internet
- icecat 60.7 *(requires option `{useCanvasElements: true}`)*

### ♻️ freshness
- [libwebp def64e9](https://github.com/webmproject/libwebp/tree/def64e920ff69e1d8270a2787d13df7c0d38d8ba) — 2020-08-17
- [emscripten 2.0.1](https://github.com/emscripten-core/emscripten/releases/tag/2.0.1) — 2020-08-21

### ⚠️ known issues and deficiencies
- doesn't yet support css background images (pull requests welcome!)
- doesn't yet support `<picture>` elements
- doesn't yet support web workers (decodes images one-at-a-time, blocking, single-threaded)
- no wasm (using asm.js, because of older browsers)

<br/>

webp-hero's easy install snippet
--------------------------------

paste this into your html page's `<head>` section:

```html
<script
  src="https://unpkg.com/webp-hero@0.1/dist-cjs/conditionally.js"
  data-webp-hero
  data-include-polyfills
></script>
```

that's it, you're probably done.

<br/>

configure the snippet, for special situations
---------------------------------------------

the snippet is actually smaller script, called "conditionally", that loads the full webp-hero bundle only when it detects that your browser doesn't support webp.

you can add html attributes to the script tag, to customize the installation:

- `data-webp-hero` *(required)*  
  conditionally actually uses this attribute to locate this script tag in your document
- `data-include-polyfills` *(recommended)*  
  when this attribute is present, conditionally loads polyfills for old browsers, before loading the full bundle (only loads when your browser doesn't support webp)
  - omit this attribute if your application already loads its own polyfills (promise and array)
  - `data-include-polyfills="my-custom-url/polyfills.js"`  
    you can provide your own specific url for polyfills to load
- `data-bundle="my-custom-url/webp-hero.bundle.js"`  
  specify a custom url for the webp-hero bundle (only loads when your browser doesn't support webp)
- `data-force`  
  skip detection of webp-support, and force the loading and execution of webp-hero's polyfill regardless
- `data-force-use-canvas-elements`  
  skip detection of webp-to-png support, and force the technique of replacing images with canvases that the decoder directly paints to (this special technique is used by browsers with anti-fingerprinting security measures, like icecat)
- `data-use-custom-behavior`  
  skip the default webp-hero polyfill document routine, because you want to implement your own!  
  after providing this attribute, you should add your own script that implements the behavior, by waiting for the `webpHeroPromise` to resolve, like this:
  ```html
  <script>
    window.webpHeroPromise.then(webpHero => {

      var webpMachine = new webpHero.WebpMachine()
      webpMachine.polyfillDocument()

    }).catch(error => console.error(error))
  </script>
  ```

<br/>

custom implementation work
--------------------------

### custom implementation work, with webp-machine

- as shown above, you can use the `webpHeroPromise` from the "conditionally" snippet, to gain access to the webpHero bundle module
  - but you don't have to use `conditionally.js`: you could load the `webp-hero.bundle.js` directly, or have an application that imports individual modules
- `window.webpHero.WebpMachine` gives you access to [webp-machine.ts](./source/webp-machine.ts), and it has logic for polyfilling, caching, and enforcing sequential webp decoding
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
- the `window.webpHero` module also gives you access to the exports in these modules:
  - [convert-binary-data.ts](./source/convert-binary-data.ts)
  - [detect-canvas-reading-support.ts](./source/detect-canvas-reading-support.ts)
  - [detect-webp-support.ts](./source/detect-webp-support.ts)
  - [interfaces.ts](./source/interfaces.ts)
  - [load-binary-data.ts](./source/load-binary-data.ts)

### manual-style, directly with the google libwebp decoder

- don't need webp-hero's polyfilling logic? just want to use google's webp decoder directly? *we've got you covered*
- we compile from google's libwebp emscripten build in a docker container
- this build contains minimal functionality for rendering webp data to a canvas:
  - google's emscripten output: `webp-hero/libwebp/google/webp.js`
- we do little hacks to wrap this build into two modules:
  - common-js: `webp-hero/libwebp/webp.cjs.js`
  - es-module: `webp-hero/libwebp/webp.js`
- we have a typescript declaration for it too: [webp.d.ts](./libwebp/source/webp.d.ts)

<br/>

webp-hero dev and contributing
------------------------------

- **prerequisites**
  - git and node
  - docker (only if you want to rebuild google's libwebp)
- **webp-hero development**
  - `npm install`
    - installs dependencies
    - runs the project's build (typescript, bundling)
    - deletes and regenerates `webp-hero/dist/` and `webp-hero/dist-cjs/`
    - generates the polyfills (cjs-only)
    - does *not* rebuild google's libwebp
  - `npm start` — start http server
    - visit http://localhost:5000/ to see the webp-hero demo
    - visit http://localhost:5000/libwebp/dist/google/ to see google's demo
- **rebuild google's libwebp**
  - libwebp build artifacts in `libwebp/dist` are checked into git, because it takes so damn long to build
  - `libwebp/build` — run dockerized libwebp build, regenerates `libwebp/dist`
  - `libwebp/debug` — handy for debugging the dockerized build

<br/>

💖 made with open source love
-----------------------------

please feel free to ask questions by posting github issues, and contribute by filing bugs, making suggestions, submitting pull requests

&nbsp; 🍻 chase

<br/>
