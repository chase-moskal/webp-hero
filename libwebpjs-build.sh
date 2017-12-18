#!/bin/bash

cd libwebpjs
rm -rf dist
docker build -t webphero .
docker run --volume $PWD/dist:/dist --rm webphero /work/source/container-script.sh
chmod -R 777 dist
