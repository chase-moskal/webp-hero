
![webp-hero](webp-hero.jpg)


webp-hero
=========

***work in progress!*** *webp-hero is coming soon!*


browser polyfill for the webp image format
------------------------------------------

simply add a single script to your html page, and your webp images come alive in firefox, safari, edge, and internet explorer

webp-hero actually runs google's `libwebp` decoder in the browser — it converts webp images to png's on-the-fly

the polyfill renders the decoded image data to a hidden canvas, then converting that to a png data url, which is then displayed to the user

this pushes the burden off your bandwidth expense, and onto your user's processor (running the decoder)


current state
-------------

- within a docker container, we've got libwebp producing `webp.js` and the associated demo page


immediate technical goals
-------------------------

- **webp decoder javascript module**
	- is called `"dwebp.js"`, and is self-contained
	- contains minimum functionality to decode webp
	- available in es6 and umd module formats
	- uses a worker thread for each decoding operation
	- published to npm

- **webp polyfill**
	- `"webp-hero.js"`
	- decoder is bundled in
	- loops through web page's webp images
	- decodes webp and renders to hidden canvas
	- replaces image sources with png data url's


development
-----------

- **prerequisites**
	- docker
	- node

- **run the build script**
	- `./build.sh` — use admin privileges (docker requires this)
	- run the docker build of libwebp (takes a long time)
	- write build artifacts to `dist/`

- **run the http server**
	- `npm start`
	- visit http://localhost:8080/ to see google's web demo
