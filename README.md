
![webp-hero](webp-hero.jpg)


webp-hero — [live demo](https://chase-moskal.github.io/webp-hero/)
=========


browser polyfill for the webp image format
------------------------------------------

- `npm install webp-hero`

simply add [webp-hero.polyfill.bundle.js](./dist/webp-hero.polyfill.bundle.js) to your html page, and your webp images come alive in firefox, safari, edge, internet explorer, and of course, chrome

webp-hero actually runs google's `libwebp` decoder in the browser — it converts webp images to png's on-the-fly

the polyfill renders the decoded image data to a hidden canvas, and converts that to a png data url which is then displayed to the user

webp-hero's polyfill bundle is actually kinda heavy weight at almost 500 KB

it's a trade-off — it pushes the burden off your bandwidth expense, and onto your user's processor (running the decoder instead of serving up fat images)


features
--------

- [**webp-hero.polyfill.bundle.js**](./dist/webp-hero.polyfill.bundle.js)
	- just run that script on your html page
	- it will decode your page's webp images (currently only img tags)
	- the functionality is directly available with the `"webp-hero"` common-js module [webp-hero.polyfill.js](./source/webp-hero.polyfill.ts)

- [**dwebp.js**](./dist/dwebp.js)
	- this is compiled from google's `libwebp` emscripten build, and then wrapped in a common-js module
	- contains minimal functionality for rendering webp data to a canvas — no polyfilling logic
	- available as common-js module via `"webp-hero/dist/dwebp"`
	- see the typescript declaration file, [dwebp.d.ts](./source/dwebp.d.ts), which describes its usage signature


development
-----------

- **prerequisites**
	- git
	- node
	- docker (if you want to rebuild libwebpjs)

- **development**
	- `npm install` — install dependencies and run build
	- `npm start` — start http server
	- visit http://localhost:8080/ to see google's web demo

- **build libwebpjs**
	- only necessary if you need to change the emscripten build
	- libwebpjs build artifacts are checked in, since it takes so long to build
	- `./libwebpjs-build.sh` — use admin privileges (docker requires this)
	- it runs the docker build of libwebp (takes a long time)
	- it writes build artifacts to `dist/`
	- `./libwebpjs-debug.sh` — useful to drop into the container to have a look around
