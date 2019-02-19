#!/usr/bin/env bash

cd "${0%/*}"
docker build -t webphero .
docker run -it --rm webphero
