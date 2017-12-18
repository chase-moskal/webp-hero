
FROM debian:stretch-slim
RUN mkdir /work
RUN apt-get update && apt-get install -y \
  vim git-core curl \
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

RUN mkdir /work/libwebp && cd /work/libwebp \
  && git clone --branch master https://github.com/webmproject/libwebp.git . \
  && git checkout c2d04f3e

# # compile cli via cmake
# RUN cd /work/libwebp \
#   && mkdir build \
#   && cd build \
#   && cmake -DWEBP_BUILD_CWEBP=ON -DWEBP_BUILD_DWEBP=ON ../ \
#   && make \
#   && make install

# compile cli via autoconf
# RUN cd /work/libwebp \
#   && ./autogen.sh \
#   && ./configure \
#   && make \
#   && make install \
#   && ldconfig /usr/local/lib

##
## ADD LOCAL FILES INTO WORK DIR
##

ADD . /work

##
## LIBWEBP EMSCRIPTEN BUILD
##

# replace libwebp emscripten cmake instructions
RUN rm -rf /work/libwebp/CMakeLists.txt \
  && cp /work/source/CMakeLists.txt /work/libwebp

RUN ["/bin/bash", "-c", "cd /work/emsdk-portable \
  && source ./emsdk_env.sh \
  && cd /work/libwebp/webp_js \
  && cmake -DWEBP_BUILD_WEBP_JS=ON \
    -DEMSCRIPTEN_GENERATE_BITCODE_STATIC_LIBRARIES=1 \
    -DCMAKE_TOOLCHAIN_FILE=$EMSCRIPTEN/cmake/Modules/Platform/Emscripten.cmake \
    ../ \
  && make"]
