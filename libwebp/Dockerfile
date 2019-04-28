
##
## ==============================
## :::: LIBWEBP DOCKER BUILD ::::
## ==============================
## - download and build google's libwebp from source
## - libwebp emscripten build outputs "dist/webp.js"
##

##
## ESTABLISH DEBIAN CONTAINER
##

FROM debian:stretch-slim
RUN mkdir /work
RUN apt-get update && apt-get install -y \
  vim git-core curl \
  build-essential cmake python nodejs \
  libpng-dev libjpeg-dev

##
## DOWNLOAD AND INSTALL EMSCRIPTEN
##

# download emscripten
RUN cd /work \
  && curl https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz > /work/emsdk-portable.tar.gz \
  && tar -xzf /work/emsdk-portable.tar.gz

# run emscripten self installation
RUN cd /work/emsdk-portable \
  && ./emsdk update \
  && ./emsdk install sdk-1.38.30-64bit \
  && ./emsdk activate sdk-1.38.30-64bit

# verify emscripten
RUN ["/bin/bash", "-c", "cd /work/emsdk-portable && source ./emsdk_env.sh && emcc --version"]

##
## DOWNLOAD LIBWEBP SOURCE
##

RUN mkdir /work/libwebp && cd /work/libwebp \
  && git clone --branch master https://github.com/webmproject/libwebp.git . \
  && git checkout 1326988d1091202be426aba07d0061b6759862ff

##
## COPY LOCAL FILES INTO CONTAINER
##

ADD . /work

##
## RUN LIBWEBP EMSCRIPTEN BUILD
##

# replace libwebp emscripten cmake instructions
RUN rm -rf /work/libwebp/CMakeLists.txt \
  && cp /work/source/CMakeLists.txt /work/libwebp

# run the webp js build
RUN ["/bin/bash", "-c", "cd /work/emsdk-portable \
  && source ./emsdk_env.sh \
  && cd /work/libwebp/webp_js \
  && cmake -DWEBP_BUILD_WEBP_JS=ON \
    -DEMSCRIPTEN_GENERATE_BITCODE_STATIC_LIBRARIES=1 \
    -DCMAKE_TOOLCHAIN_FILE=$EMSCRIPTEN/cmake/Modules/Platform/Emscripten.cmake \
    ../ \
  && make"]
