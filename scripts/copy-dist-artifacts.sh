#!/bin/bash

##
## COPY DIST ARTIFACTS
##
##  + this script runs inside the docker container
##
##  + it copies various artifacts into the 'dist' volume
##

mkdir /dist/images /dist/webpjs;
cp /work/images/* /dist/images;
cp -r /work/libwebp/webp_js/*.{mem,js,html,webp} /dist/webpjs;
