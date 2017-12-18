#!/bin/bash

# clean up the host 'dist' dir
rm -rf ./dist

# build the docker image
docker build -t webphero .

# run the docker container, with 'dist' volume, and run the container script
docker run --volume $PWD/dist:/dist --rm webphero /bin/bash -c "chmod -R 755 /work/scripts && /work/scripts/container-script.sh"

# set reasonable permissions to the 'dist' dir
chmod -R 755 ./dist
