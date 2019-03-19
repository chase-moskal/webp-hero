#!/usr/bin/env bash

mkdir /dist/google

# copy dist artifacts
cp -r /work/libwebp/webp_js/*.{js,html,webp} /dist/google

# wrap up es module
cat \
	/work/source/wrapping-start.js.txt \
	/dist/google/webp.js \
	/work/source/wrapping-end.js.txt \
	> /dist/webp.js

# wrap up commonjs module
cat \
	/work/source/wrapping-start.js.txt \
	/dist/google/webp.js \
	/work/source/wrapping-end.cjs.js.txt \
	> /dist/webp.cjs.js

# copy in definition file
cp /work/source/webp.d.ts /dist/webp.d.ts

##
## CONVERT TEST IMAGES
##

# cd /work/images \
#   && cwebp dice.original.png -o dice.webp \
#   && dwebp dice.webp -o dice.png

##
## COPY DIST ARTIFACTS
##

# mkdir /dist/images
# cp /work/images/* /dist/images
