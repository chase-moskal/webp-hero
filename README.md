
webp-hero
=========

development
-----------

- docker build: `sudo docker build -t webphero .`
- docker run interactively: `sudo docker run -it --entrypoint /bin/bash --rm webphero`
- docker run tests: `sudo docker run -id --name w123 --rm webphero && sudo docker cp w123:/work/images ./dist && sudo docker kill w123`
