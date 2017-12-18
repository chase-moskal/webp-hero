#!/bin/bash

##
## CONVERT TEST IMAGES
##

cd /work/images \
  && cwebp dice.original.png -o dice.webp \
  && dwebp dice.webp -o dice.png

##
## COPY DIST ARTIFACTS
##

mkdir /dist/images
cp /work/images/* /dist/images

mkdir /dist/webpjs
cp -r /work/libwebp/webp_js/*.{js,html,webp} /dist/webpjs
