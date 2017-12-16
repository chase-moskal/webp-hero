#!/bin/bash

##
## WEBP HERO BUILD SCRIPT
##
##  + this script runs on the host machine
##  + this script orchestrates the docker machine so as to run a build
##  + this script must be run with docker-level priviledges
##  + see the dockerfile for the real action
##

# clean up the host dist dir
rm -rf ./dist;

# build the docker image
docker build -t webphero .;

# run the docker container with 'dist' as a volume run "copy-dist.sh" in container
docker run --volume $PWD/dist:/dist --rm webphero /work/scripts/copy-dist-artifacts.sh;

# set reasonable permissions to the 'dist' dir
chmod -R 755 ./dist;
