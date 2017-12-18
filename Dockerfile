
FROM debian:stretch-slim
RUN mkdir /work
RUN apt-get update && apt-get install -y \
  vim git-core curl \
  gcc make autoconf automake libtool \
  build-essential cmake python nodejs \
  libpng-dev libjpeg-dev

##
## EMSCRIPTEN
##

# download emscripten
RUN cd /work \
  && curl https://s3.amazonaws.com/mozilla-games/emscripten/releases/emsdk-portable.tar.gz > /work/emsdk-portable.tar.gz \
  && tar -xzf /work/emsdk-portable.tar.gz

# run emscripten self installation
RUN cd /work/emsdk-portable \
  && ./emsdk update \
  && ./emsdk install sdk-1.37.22-64bit \
  && ./emsdk activate sdk-1.37.22-64bit

# verify emscripten
RUN ["/bin/bash", "-c", "cd /work/emsdk-portable && source ./emsdk_env.sh && emcc --version"]

##
## LIBWEBP
##

RUN git clone --branch v0.6.1 https://github.com/webmproject/libwebp.git /work/libwebp

# compile cli via cmake
RUN cd /work/libwebp \
  && mkdir build \
  && cd build \
  && cmake -DWEBP_BUILD_CWEBP=ON -DWEBP_BUILD_DWEBP=ON ../ \
  && make \
  && make install

# compile cli via autoconf
# RUN cd /work/libwebp \
#   && ./autogen.sh \
#   && ./configure \
#   && make \
#   && make install \
#   && ldconfig /usr/local/lib

##
## LIBWEBP EMSCRIPTEN BUILD
##

RUN ["/bin/bash", "-c", "cd /work/emsdk-portable \
  && source ./emsdk_env.sh \
  && cd /work/libwebp/webp_js \
  && cmake -DWEBP_BUILD_WEBP_JS=ON \
    -DEMSCRIPTEN_GENERATE_BITCODE_STATIC_LIBRARIES=1 \
    -DCMAKE_TOOLCHAIN_FILE=$EMSCRIPTEN/cmake/Modules/Platform/Emscripten.cmake \
    ../ \
  && make"]

##
## ADD LOCAL FILES INTO WORK DIR
##

ADD . /work
