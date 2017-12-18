#!/bin/bash

cd libwebpjs
docker build -t webphero .
docker run -it --rm webphero
