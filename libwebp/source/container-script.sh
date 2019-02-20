#!/usr/bin/env bash

mkdir /dist/google

# copy dist artifacts
cp -r /work/libwebp/webp_js/*.{js,html,webp} /dist/google

# wrap up commonjs module
cat \
	/work/source/wrapping.js.start.txt \
	/dist/google/webp.js \
	/work/source/wrapping.js.end.txt \
	> /dist/webp.js

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
