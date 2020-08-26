
##
## ========================================
## :::: LIBWEBP'S WEBP_JS DOCKER BUILD ::::
## ========================================
##

##
## ESTABLISH DEBIAN CONTAINER
##

FROM debian:bullseye-slim
RUN apt-get update && apt-get install -y \
  vim git-core curl \
  build-essential cmake python3 nodejs \
  libpng-dev libjpeg-dev

RUN mkdir /work
WORKDIR /work

##
## INSTALL EMSCRIPTEN
##

RUN ( \
  git clone https://github.com/emscripten-core/emsdk.git && \
  cd emsdk && \
  ./emsdk install 2.0.1 && \
  ./emsdk activate 2.0.1 \
)

##
## DOWNLOAD LIBWEBP SOURCE
##

RUN ( \
  git clone --branch master https://github.com/webmproject/libwebp.git && \
  cd libwebp && \
  git checkout def64e920ff69e1d8270a2787d13df7c0d38d8ba \
)

##
## COPY LOCAL FILES INTO CONTAINER
##

COPY . /work

# replace libwebp emscripten cmake instructions
RUN rm /work/libwebp/CMakeLists.txt && \
  cp /work/source/CMakeLists.txt /work/libwebp

##
## RUN LIBWEBP WEBP_JS EMSCRIPTEN BUILD
##

RUN ["/bin/bash", "-c", " \
  source /work/emsdk/emsdk_env.sh && \
  export EMSCRIPTEN=$EMSDK/upstream/emscripten/ && \
  cd /work/libwebp/webp_js && \
  cmake -DWEBP_BUILD_WEBP_JS=ON \
    -DCMAKE_TOOLCHAIN_FILE=$EMSCRIPTEN/cmake/Modules/Platform/Emscripten.cmake \
    ../ && \
  make \
"]
