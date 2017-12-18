#!/bin/bash

docker build -t webphero .
docker run -it --rm webphero
